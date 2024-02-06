export interface IExpenses {
  userId: number;
  type: string;
  amount: number;
}

export enum ExpensesType {
  COFFEE = 'coffee',
  FOOD = 'food',
  ALCOHOL = 'alcohol',
}
