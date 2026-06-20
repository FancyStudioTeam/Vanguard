import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

export const SPANISH_THEME_CONFIG: LocaleSpecificConfig<DefaultTheme.Config> = {
	lang: 'es-ES',
	themeConfig: {
		nav: [
			{
				link: 'https://vanguard.fancystudio.xyz',
				target: '_blank',
				text: 'Página Web',
			},
		],
		sidebar: [
			{
				base: '/es/general-information/',
				items: [
					{
						link: 'premium-features',
						text: 'Funcionalidades Premium',
					},
				],
				text: 'Información General',
			},
			{
				base: '/es/plugins/',
				collapsed: false,
				items: [
					{
						link: 'welcomes',
						text: 'Bienvenidas',
					},
				],
				text: 'Módulos',
			},
		],
	},
};
