import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ExpensesRepository } from '@expenses/expenses.repository';
import { SaveExpenseDto } from '@expenses/expenses.dto';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  @Get()
  async get(@Query('userId') userId: number) {
    if (!userId) {
      throw new NotFoundException();
    }

    const result = (await this.expensesRepository.get(userId)).rows;

    return result;
  }

  @Get('/average')
  async getAverage(@Query('userId') userId: number) {
    if (!userId) {
      throw new NotFoundException();
    }

    const getAverage = (
      await this.expensesRepository.getAverageByUserId(userId)
    ).rows;

    return getAverage;
  }

  @Get('/average-per-week')
  async getAveragePerWeek(@Query('userId') userId: number) {
    if (!userId) {
      throw new NotFoundException();
    }

    const getAveragePerWeek = (
      await this.expensesRepository.getAveragePerWeekByUserId(userId)
    ).rows;

    return getAveragePerWeek;
  }

  @Post()
  async save(@Body() dto: SaveExpenseDto) {
    const currentRecord = await this.expensesRepository.getCurrentRecordPerType(
      dto.userId,
      dto.type,
    );

    if (currentRecord.rowCount) {
      throw new BadRequestException(
        'There is already an existing record for this type today.',
      );
    }

    const result = (await this.expensesRepository.add(dto)).rows[0];

    return result;
  }
}
