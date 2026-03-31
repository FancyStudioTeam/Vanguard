import { env } from 'node:process';

const { NODE_ENV = 'production' } = env;

export function getEnvFileName(): EnvironmentFileName {
	const productionStringRegex = /production/i;
	const isProductionEnvironment = productionStringRegex.test(NODE_ENV);

	return isProductionEnvironment ? '.env.production' : '.env.development';
}

type EnvironmentFileName = '.env.production' | '.env.development';
