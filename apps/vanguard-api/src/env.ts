import { env, loadEnvFile } from 'node:process';

const { NODE_ENV } = env;

if (NODE_ENV === 'development') {
	loadEnvFile();
}
