import { Module } from '@nestjs/common';

import { PrismaService } from './Prisma.service.js';

@Module({
	exports: [
		PrismaService,
	],
	providers: [
		PrismaService,
	],
})
export class PrismaModule {}
