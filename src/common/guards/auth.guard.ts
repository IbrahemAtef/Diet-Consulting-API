import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/modules/users/users.service";
import { CONFIG } from "./../constants/config.constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const PublicRoute = this.reflector.get<string[]>(
      CONFIG.PUBLIC,
      context.getHandler()
    );

    if (PublicRoute) {
      return true;
    }

    const token = request.headers.authorization;
    // if (!token) return false;
    // token = token.split(" ")[1];
    // try {
    //   const decoded = verifyToken(token, this.configService.get("jwt").secret);
    //   const user = await this.userService.findById(decoded);
    //   if (!user) return false;
    //   request.user = user.toJSON();
    //   return true;
    // } catch {
    //   return false;
    // }
    return true;
  }
}
