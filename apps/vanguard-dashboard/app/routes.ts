import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
	index('routes/HomePage.tsx'),

	route('dashboard', 'routes/dashboard.tsx'),

	route('dashboard/:guildId', 'routes/guild/layout.tsx', [
		index('routes/guild/home.tsx'),

		route('tickets', 'routes/guild/tickets/layout.tsx', [
			index('routes/guild/tickets/index.tsx'),
		]),
	]),
] satisfies RouteConfig;
