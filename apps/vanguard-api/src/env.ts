import { env } from 'node:process';

import { configDotenv } from 'dotenv';

const { NODE_ENV } = env;

/*
 * In Docker, environment variables are commonly injected using '--env-file'
 * or via 'docker-compose'.
 *
 * The '.env' file is not included in the Docker image, so attempting to load
 * it at runtime may fail.
 */
if (NODE_ENV === 'development') {
	configDotenv({
		quiet: true,
	});
}
