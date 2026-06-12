/**
 * @see https://e18e.dev/docs/replacements/rimraf
 */

import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

await rm(join(cwd(), 'dist'), {
	force: true,
	recursive: true,
});
