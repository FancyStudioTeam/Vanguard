import { env } from 'node:process';

const { NODE_ENV } = env;

export function isProductionEnvironment() {
	return String(NODE_ENV).toLowerCase() === 'production';
}
