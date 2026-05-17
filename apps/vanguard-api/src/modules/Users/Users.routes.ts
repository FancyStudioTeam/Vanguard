import type { RouteTree } from '@nestjs/core';

import { UserModule } from './User/User.module.js';
import { UsersModule } from './Users.module.js';

export const UsersRoutes: RouteTree = {
	children: [
		{
			module: UserModule,
			path: '@me',
		},
	],
	module: UsersModule,
	path: 'users',
};
