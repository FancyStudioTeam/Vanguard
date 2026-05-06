import { Module } from '@nestjs/common';

import { MeModule } from './Me/Me.module.js';

@Module({
	imports: [
		MeModule,
	],
})
export class UsersModule {}
