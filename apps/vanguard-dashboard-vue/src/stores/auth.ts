import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authorization: null,
	}),
});
