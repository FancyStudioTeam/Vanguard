import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetWind4 from '@unocss/preset-wind4';
import { defineConfig } from 'unocss';

export default defineConfig({
	presets: [
		presetAttributify({
			prefix: 'uno-',
			prefixedOnly: true,
		}),
		presetIcons(),
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
