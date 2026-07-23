import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetWind4 from '@unocss/preset-wind4';
import { clsx } from 'clsx';
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
		button: clsx(
			'flex h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-full border-2 border-transparent font-semibold text-sm transition focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-75',
		),
		'button-filled': clsx('bg-rose-500 text-rose-50 hover:opacity-75'),
		'button-filled-secondary': clsx('bg-zinc-800 text-zinc-50 hover:opacity-75'),
		'button-ghost': clsx('hover:bg-zinc-800'),
		'button-outline': clsx('!border-zinc-800 hover:bg-zinc-800'),
		'button-size-default': clsx('px-4 py-2'),
		'button-size-icon': clsx('p-2'),
		'dropdown-menu': clsx(
			'z-50 min-w-50 rounded-3xl border-2 border-zinc-800 bg-zinc-900 shadow-md shadow-zinc-950 focus:outline-none',
		),
		'dropdown-menu-item': clsx(
			'flex h-10 cursor-pointer select-none flex-row flex-row items-center gap-2 rounded-full reka-highlighted:bg-zinc-800 px-4 py-2 font-semibold text-sm transition focus:outline-none active:scale-95',
		),
	},
	variants: [
		(matcher) => {
			const match = matcher.match(/^reka-([a-z-]+):(.*)$/);

			if (!match) {
				return;
			}

			const [, attr, rest] = match;

			return {
				matcher: rest,
				selector: (selector) => `${selector}[data-${attr}]`,
			};
		},
	],
});
