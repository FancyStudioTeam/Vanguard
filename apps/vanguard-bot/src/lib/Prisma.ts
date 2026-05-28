import { PrismaAdapter, PrismaClient } from '@vanguard/prisma';

export const prisma = new PrismaClient({
	adapter: PrismaAdapter,
});

await prisma.$connect();
