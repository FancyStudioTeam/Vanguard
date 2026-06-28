import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
	index('routes/Home/HomePage.tsx'),

	route('dashboard', 'routes/Dashboard/DashboardPage.tsx'),

	route('dashboard/:guildId', 'routes/Guild/GuildLayout.tsx', [
		index('routes/Guild/GuildHomePage.tsx'),

		route('customization', 'routes/Guild/routes/Customization/CustomizationPage.tsx'),
		route('welcomes', 'routes/Guild/routes/Welcomes/WelcomesPage.tsx'),
	]),
] satisfies RouteConfig;
