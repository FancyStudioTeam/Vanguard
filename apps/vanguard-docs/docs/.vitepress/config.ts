import { defineConfig } from 'vitepress';

export default defineConfig({
	appearance: 'force-dark',
	cleanUrls: true,
	lastUpdated: true,
	locales: {
		es: {
			label: 'Español',
			lang: 'es',
		},
		root: {
			label: 'English',
			lang: 'en',
		},
	},
	themeConfig: {
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/FancyStudioTeam/Vanguard',
			},
		],
	},
	title: 'Vanguard',
});
