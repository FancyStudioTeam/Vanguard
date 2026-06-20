import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

export const SPANISH_THEME_CONFIG: LocaleSpecificConfig<DefaultTheme.Config> = {
	lang: 'es-ES',
	themeConfig: {
		docFooter: {
			next: 'Página Siguiente',
			prev: 'Página Anterior',
		},
		lastUpdated: {
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'short',
			},
			text: 'Última Actualización',
		},
		nav: [
			{
				link: 'https://vanguard.fancystudio.xyz',
				target: '_blank',
				text: 'Página Web',
			},
		],
		outline: {
			label: 'En esta Página',
			level: 'deep',
		},
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
