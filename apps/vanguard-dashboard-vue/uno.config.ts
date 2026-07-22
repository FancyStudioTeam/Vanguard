import presetAttributify from '@unocss/preset-attributify';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetWind4 from '@unocss/preset-wind4';
import { defineConfig } from 'unocss';

export default defineConfig({
	presets: [
		presetAttributify(),
		presetWind4(),
		presetWebFonts({
			fonts: {
				mono: 'JetBrains Mono',
				sans: 'General Sans',
			},
			provider: 'fontshare',
		}),
	],
});
