import 'virtual:uno.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { DataLoaderPlugin } from 'vue-router/experimental';

import App from './App.vue';
import enUS from './locales/en-US.json' with { type: 'json' };
import esES from './locales/es-ES.json' with { type: 'json' };
import { router } from './router.ts';

const app = createApp(App);

const i18n = createI18n<
	[
		I18nMessageSchema,
	],
	'en-US' | 'es-ES'
>({
	fallbackLocale: 'en-US',
	locale: 'en-US',
	messages: {
		'en-US': enUS,
		'es-ES': esES,
	},
});
const pinia = createPinia();

app.use(i18n);
app.use(pinia);
app.use(router);

app.use(DataLoaderPlugin, {
	router,
});

app.mount('#app');

type I18nMessageSchema = typeof enUS;
