import { Module } from '@nestjs/common';

import { UserModule } from './User/User.module.js';

@Module({
	imports: [
		UserModule,
	],
})
export class UsersModule {}
