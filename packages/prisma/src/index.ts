import { PrismaPg } from '@prisma/adapter-pg';
import { env } from 'prisma/config';

export * from './generated/prisma/client.js';
export * from './generated/prisma/enums.js';
export * from './generated/prisma/models.js';

export const PrismaAdapter = new PrismaPg({
	connectionString: env('POSTGRE_SQL_VANGUARD_DATABASE_URL'),
});
