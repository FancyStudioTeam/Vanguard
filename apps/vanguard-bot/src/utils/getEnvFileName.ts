import { isProductionEnvironment } from './isProductionEnvironment.js';

export function getEnvFileName(): EnvironmentFileName {
	return isProductionEnvironment() ? '.env.production' : '.env.development';
}

type EnvironmentFileName = '.env.production' | '.env.development';
