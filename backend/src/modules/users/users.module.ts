import { ExpensesModule } from '@expenses/expenses.module';
import { Module } from '@nestjs/common';
import { UsersController } from '@users/users.controller';
import { UsersRepository } from '@users/users.repository';

@Module({
  imports: [ExpensesModule],
  controllers: [UsersController],
  exports: [],
  providers: [UsersRepository],
})
export class UsersModule {}
