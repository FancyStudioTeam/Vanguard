/**
 * Cleans the 'dist' directory before building the application.
 *
 * @see https://e18e.dev/docs/replacements/rimraf
 */

import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

const DIST_PATH = join(cwd(), 'dist');

await rm(DIST_PATH, {
	force: true,
	recursive: true,
});
