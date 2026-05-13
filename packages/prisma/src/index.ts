import { PrismaPg } from '@prisma/adapter-pg';
import { env } from 'prisma/config';

// biome-ignore lint/performance/noBarrelFile: (x)
export { PrismaClient } from './generated/prisma/client.js';
export type * from './generated/prisma/enums.js';
export type * from './generated/prisma/models.js';

export const PrismaAdapter = new PrismaPg({
	connectionString: env('POSTGRE_SQL_DATABASE_URL'),
});
