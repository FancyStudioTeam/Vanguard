import { Module } from '@nestjs/common';

import { BillingService } from './Billing.service.js';

@Module({
	exports: [
		BillingService,
	],
	providers: [
		BillingService,
	],
})
export class BillingModule {}
