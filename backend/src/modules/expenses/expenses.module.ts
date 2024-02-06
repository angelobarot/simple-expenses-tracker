import { Module } from '@nestjs/common';
import { ExpensesController } from '@expenses/expenses.controller';
import { ExpensesRepository } from '@expenses/expenses.repository';

@Module({
  imports: [],
  controllers: [ExpensesController],
  exports: [ExpensesRepository],
  providers: [ExpensesRepository],
})
export class ExpensesModule {}
