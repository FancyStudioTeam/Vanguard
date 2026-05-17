import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
	index('routes/Home/HomePage.tsx'),

	route('dashboard', 'routes/Dashboard/DashboardPage.tsx'),

	route('dashboard/:guildId', 'routes/Guild/GuildLayout.tsx', [
		index('routes/Guild/GuildHomePage.tsx'),

		route('tickets', 'routes/Guild/routes/Tickets/TicketsLayout.tsx', [
			index('routes/guild/routes/Tickets/TicketsPage.tsx'),
		]),
	]),
] satisfies RouteConfig;
