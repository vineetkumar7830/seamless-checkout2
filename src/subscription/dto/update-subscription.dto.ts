import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends PartialType(CreatePlanDto) {}
