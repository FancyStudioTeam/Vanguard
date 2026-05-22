import { Module } from '@nestjs/common';

import { ParserModule } from '#modules/Parser/Parser.module.js';
import { PrismaModule } from '#modules/Prisma/Prisma.module.js';
import { TicketsController } from './Tickets.controller.js';
import { TicketsService } from './Tickets.service.js';

@Module({
	controllers: [
		TicketsController,
	],
	imports: [
		ParserModule,
		PrismaModule,
	],
	providers: [
		TicketsService,
	],
})
export class TicketsModule {}
