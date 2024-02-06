import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ExpensesType } from '@expenses/expenses.entity';

export class SaveExpenseDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsEnum(ExpensesType)
  type: ExpensesType;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
