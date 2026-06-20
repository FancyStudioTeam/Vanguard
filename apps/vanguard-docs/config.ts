import { defineConfig } from 'vitepress';

export default defineConfig({
	themeConfig: {
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
				text: 'Features',
			},
		],
	},
});
