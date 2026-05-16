import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { UserModule } from './User/User.module.js';

@Module({
	imports: [
		RouterModule.register([
			{
				children: [
					{
						module: UserModule,
						path: '@me',
					},
				],
				path: 'users',
			},
		]),
		UserModule,
	],
})
export class UsersModule {}
