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
				pixel: {
					name: 'Tiny5',
					provider: 'fontsource',
				},
				sans: 'General Sans',
			},
			provider: 'fontshare',
		}),
	],
	shortcuts: {
		button: 'flex h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-full border-2 border-transparent font-semibold text-sm transition active:scale-95 disabled:pointer-events-none disabled:opacity-75',
		'button-filled': 'bg-rose-500 text-rose-50 hover:opacity-75',
		'button-filled-secondary': 'bg-zinc-800 text-zinc-50 hover:opacity-75',
		'button-ghost': 'hover:bg-zinc-800',
		'button-outline': '!border-zinc-800 hover:bg-zinc-800',
		'button-size-default': 'px-4 py-2',
		'button-size-icon': 'p-2',
	},
});
