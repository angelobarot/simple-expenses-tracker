import { ExpensesRepository } from '@expenses/expenses.repository';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersRepository } from '@users/users.repository';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly expensesRepository: ExpensesRepository,
  ) {}

  @Get()
  async getUsers() {
    const users = (await this.usersRepository.get()).rows;

    return users.map((user) => ({ id: user.user_id }));
  }

  @Get('/:userId/expenses')
  async getCurrentRecord(@Param('userId') userId: number) {
    if (!userId) {
      throw new NotFoundException();
    }

    const result = (await this.expensesRepository.getCurrentRecord(userId))
      .rows;

    return result.map((item) => ({
      id: item.id,
      userId: item.user_id,
      type: item.type,
      date: item.date,
      amount: item.amount,
    }));
  }
}
