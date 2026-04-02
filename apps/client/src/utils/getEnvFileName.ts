import { IS_PRODUCTION_ENVIRONMENT } from '#lib/Constants.js';

export function getEnvFileName(): EnvironmentFileName {
	return IS_PRODUCTION_ENVIRONMENT ? '.env.production' : '.env.development';
}

type EnvironmentFileName = '.env.production' | '.env.development';
