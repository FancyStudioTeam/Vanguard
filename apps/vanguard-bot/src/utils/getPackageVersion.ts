import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const PACKAGE_JSON_FILE_PATH = join(cwd(), 'package.json');

export function getPackageVersion(): string {
	const packageJsonFileContent = readFileSync(PACKAGE_JSON_FILE_PATH, 'utf-8');
	const packageJsonFileParsedContent = JSON.parse(packageJsonFileContent);

	const { version } = packageJsonFileParsedContent;

	return String(version);
}
