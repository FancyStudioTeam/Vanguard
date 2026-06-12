import { loadEnvFile } from 'node:process';

import { defineConfig, env } from 'prisma/config';

loadEnvFile();

export default defineConfig({
	datasource: {
		url: env('POSTGRE_SQL_VANGUARD_DATABASE_URL'),
	},
	migrations: {
		path: 'prisma/migrations',
	},
	schema: 'prisma/',
});
