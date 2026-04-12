import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),

	route('dashboard', 'routes/dashboard.tsx'),

	route('dashboard/:guildId', 'routes/guild/layout.tsx', [
		index('routes/guild/home.tsx'),
	]),
] satisfies RouteConfig;
