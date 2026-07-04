import { env } from 'node:process';

export function getEnvVariable(variableName: string): string {
	const variable = env[variableName];

	if (variable === undefined) {
		throw new TypeError(`Environment variable '${variableName}' is not configured`);
	}

	return variable;
}
