import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { UsersService } from "src/modules/users/users.service";
import { CONFIG } from "./../constants/config.constants";
import { verifyToken } from "../utils";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const PublicRoute = this.reflector.get<string[]>(
      CONFIG.PUBLIC,
      context.getHandler()
    );

    if (PublicRoute) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const { token } = request.headers;

    if (!token) return false;
    const decoded: any = await verifyToken(
      token,
      this.configService.get(CONFIG.JWT_SECRET)
    );

    const user = await this.usersService.findUserById(decoded.id);
    if (!user) return false;

    request.user = user;
    return true;
  }
}
