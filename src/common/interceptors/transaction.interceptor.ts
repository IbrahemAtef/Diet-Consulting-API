import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { CONFIG } from "../constants";

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    @Inject(CONFIG.SEQUELIZE)
    private readonly sequelize: Sequelize
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();

    const transaction: Transaction = await this.sequelize.transaction();
    req.transaction = transaction;
    return next.handle().pipe(
      tap(() => {
        transaction.commit();
      }),
      catchError((err) => {
        transaction.rollback();
        return throwError(() => err);
      })
    );
  }
}
