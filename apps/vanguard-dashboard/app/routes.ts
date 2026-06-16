import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
	index('routes/Home/HomePage.tsx'),

	route('dashboard', 'routes/Dashboard/DashboardPage.tsx'),

	route('dashboard/:guildId', 'routes/Guild/GuildLayout.tsx', [
		index('routes/Guild/GuildHomePage.tsx'),
	]),
] satisfies RouteConfig;
