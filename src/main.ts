import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import * as winston from "winston";
import { WinstonModule } from "nest-winston";
import { UsersService } from "src/modules/users/users.service";
import { AppModule } from "./app.module";
import { CONFIG } from "./common/constants";
import { AuthGuard, RolesGuard } from "./common/guards";

async function bootstrap() {
  const { combine, timestamp, printf, colorize, align } = winston.format;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
      transports: [new winston.transports.Console()],
    }),
  });
  const configService = app.get(ConfigService);
  const port = configService.get(CONFIG.PORT);
  const usersService = app.get(UsersService);

  app.setGlobalPrefix("api/v1");

  app.useGlobalGuards(
    new AuthGuard(usersService, new Reflector(), configService),
    new RolesGuard(new Reflector())
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  await app.listen(port);
}
bootstrap();
