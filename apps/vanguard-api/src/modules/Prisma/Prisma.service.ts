import { PrismaAdapter, PrismaClient } from '@vanguard/prisma';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
	public constructor() {
		super({
			adapter: PrismaAdapter,
		});
	}
}
