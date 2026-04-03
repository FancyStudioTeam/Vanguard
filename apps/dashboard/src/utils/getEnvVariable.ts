import 'server-only';
import { env } from 'node:process';

export function getEnvVariable(variableName: string): string {
	const variable = env[variableName];

	if (!variable) {
		throw new TypeError(`Environment variable '${variableName}' is not configured`);
	}

	return variable;
}
