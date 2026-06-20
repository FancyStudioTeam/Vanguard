import { defineConfig } from 'vitepress';

export default defineConfig({
	base: '/es/',
	lang: 'es-ES',
	themeConfig: {
		sidebar: [
			{
				base: '/general-information/',
				items: [
					{
						link: 'premium-features',
						text: 'Funcionalidades Premium',
					},
				],
				text: 'Información General',
			},
			{
				base: '/plugins/',
				collapsed: false,
				items: [
					{
						link: 'welcomes',
						text: 'Bienvenidas',
					},
				],
				text: 'Funcionalidades',
			},
		],
	},
});
