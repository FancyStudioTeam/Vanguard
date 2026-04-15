import { PrismaPg } from '@prisma/adapter-pg';
import { env } from 'prisma/config';
import { PrismaClient } from './generated/prisma/client.js';

export const adapter = new PrismaPg({
	connectionString: env('POSTGRE_SQL_DATABASE_URL'),
});
export const prisma = new PrismaClient({
	adapter,
});
