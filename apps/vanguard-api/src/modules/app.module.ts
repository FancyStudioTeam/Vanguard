import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
	controllers: [
		AppController,
	],
	imports: [
		AuthModule,
	],
})
export class AppModule {}
