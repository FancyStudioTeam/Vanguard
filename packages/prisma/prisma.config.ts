import 'dotenv/config';

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
	datasource: {
		url: env('POSTGRE_SQL_DATABASE_URL'),
	},
	migrations: {
		path: 'prisma/migrations',
	},
	schema: 'prisma/',
});
