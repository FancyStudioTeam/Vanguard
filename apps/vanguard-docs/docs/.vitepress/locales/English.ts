import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

export const ENGLISH_THEME_CONFIG: LocaleSpecificConfig<DefaultTheme.Config> = {
	lang: 'en-US',
	themeConfig: {
		lastUpdated: {
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'short',
			},
			text: 'Last Update',
		},
		nav: [
			{
				link: 'https://vanguard.fancystudio.xyz',
				target: '_blank',
				text: 'Website',
			},
		],
		sidebar: [
			{
				base: '/general-information/',
				items: [
					{
						link: 'premium-features',
						text: 'Premium Features',
					},
				],
				text: 'General Information',
			},
			{
				base: '/plugins/',
				collapsed: false,
				items: [
					{
						link: 'welcomes',
						text: 'Welcomes',
					},
				],
				text: 'Modules',
			},
		],
	},
};
