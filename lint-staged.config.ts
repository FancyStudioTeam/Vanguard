import type { Configuration } from 'lint-staged';

export default {
	'**/*.{js,jsx,ts,tsx,json,css}': 'pnpm biome:write',
} as Configuration;
