import { Module } from '@nestjs/common';
import { UsersMeModule } from './Me/UsersMe.module.js';

@Module({
	imports: [
		UsersMeModule,
	],
})
export class UsersModule {}
