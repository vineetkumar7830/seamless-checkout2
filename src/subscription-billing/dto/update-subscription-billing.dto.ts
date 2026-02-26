import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionBillingDto } from './create-subscription-billing.dto';

export class UpdateSubscriptionBillingDto extends PartialType(CreateSubscriptionBillingDto) {}
