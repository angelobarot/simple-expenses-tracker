import { Module } from '@nestjs/common';
import { ExpensesModule } from '@expenses/expenses.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [ExpensesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
