import createMdx from '@next/mdx';
import type { NextConfig } from 'next';

const withMdx = createMdx({
	extension: /\.(md|mdx)$/,
	options: {
		rehypePlugins: [],
		remarkPlugins: [
			'remark-gfm',
		],
	},
});

export default withMdx({
	experimental: {
		authInterrupts: true,
		viewTransition: true,
	},
	pageExtensions: [
		'md',
		'mdx',
		'ts',
		'tsx',
	],
	reactCompiler: true,
	reactStrictMode: true,
	redirects() {
		return [
			{
				destination: 'https://github.com/FancyStudioTeam',
				permanent: true,
				source: '/github',
			},
			{
				destination: 'https://discord.gg/yWjeDA6ewJ',
				permanent: true,
				source: '/discord',
			},
			{
				destination: 'https://www.patreon.com/c/FancyStudio',
				permanent: true,
				source: '/patreon',
			},
		];
	},
} as NextConfig);
