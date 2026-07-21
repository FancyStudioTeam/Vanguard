import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			component: () => import('./views/HomeView.vue'),
			name: 'home',
			path: '/',
		},
	],
});

export default router;
