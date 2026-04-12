import type { Config } from '@react-router/dev/config';

export default {
	future: {
		// biome-ignore lint/style/useNamingConvention: (x)
		v8_middleware: true,
	},
	ssr: true,
} as Config;
