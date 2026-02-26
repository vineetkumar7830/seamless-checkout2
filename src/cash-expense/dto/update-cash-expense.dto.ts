import { PartialType } from '@nestjs/swagger';
import { CreateCashExpenseDto } from './create-cash-expense.dto';

export class UpdateCashExpenseDto extends PartialType(CreateCashExpenseDto) {}
