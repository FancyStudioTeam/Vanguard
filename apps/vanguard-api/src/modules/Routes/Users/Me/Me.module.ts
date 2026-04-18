import { Module } from '@nestjs/common';
import { MeController } from './Me.controller.js';

@Module({
	controllers: [
		MeController,
	],
})
export class MeModule {}
