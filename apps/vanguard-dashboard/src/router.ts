import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			children: [
				{
					component: () => import('./views/Routes/Home/HomeView.vue'),
					name: 'Home',
					path: '',
				},
				{
					component: () => import('./views/Routes/Dashboard/DashboardView.vue'),
					meta: {
						requiresAuth: true,
					},
					name: 'Dashboard',
					path: '/dashboard',
				},
				{
					component: () => import('./views/Routes/Pricing/PricingView.vue'),
					name: 'Pricing',
					path: '/pricing',
				},
				{
					component: () => import('./views/Routes/NotFound/NotFoundView.vue'),
					meta: {
						useFullViewport: true,
					},
					name: 'NotFound',
					path: '/:pathMatch(.*)*',
				},
			],
			component: () => import('./views/Layouts/PageLayout.vue'),
			path: '/',
		},
	],
});

declare module 'vue-router' {
	interface RouteMeta {
		requiresAuth?: boolean;
		useFullViewport?: boolean;
	}
}
