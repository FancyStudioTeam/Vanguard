import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			children: [
				{
					component: () => import('./views/Home/HomeView.vue'),
					name: 'Home',
					path: '',
				},
				{
					component: () => import('./views/GuildSelector/GuildSelectorView.vue'),
					meta: {
						requiresAuth: true,
					},
					name: 'Dashboard',
					path: '/dashboard',
				},
			],
			component: () => import('./layouts/PageLayout.vue'),
			path: '/',
		},
	],
});

declare module 'vue-router' {
	interface RouteMeta {
		requiresAuth?: boolean;
	}
}
