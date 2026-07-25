import 'virtual:uno.css';

import { PiniaColada } from '@pinia/colada';
import { createHead } from '@unhead/vue/client';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { DataLoaderPlugin } from 'vue-router/experimental';

import App from './App.vue';
import enUS from './locales/en-US.json' with { type: 'json' };
import esES from './locales/es-ES.json' with { type: 'json' };
import { router } from './router.ts';

const AVAILABLE_LOCALES = [
	'en-US',
	'es-ES',
] as const;

const locale = getPreferredLocale();

const app = createApp(App);

const head = createHead({
	init: [
		{
			htmlAttrs: {
				lang: locale,
			},
		},
	],
});
const i18n = createI18n<
	[
		I18nMessageSchema,
	],
	I18nLocale
>({
	fallbackLocale: 'en-US',
	legacy: false,
	locale: getPreferredLocale(),
	messages: {
		'en-US': enUS,
		'es-ES': esES,
	},
});
const pinia = createPinia();

app.use(head);
app.use(i18n);
app.use(pinia);
app.use(PiniaColada);
app.use(router);

app.use(DataLoaderPlugin, {
	router,
});

app.mount('#app');

function getPreferredLocale(): I18nLocale {
	const locale = localStorage.getItem('locale');

	if (isLocale(locale)) {
		return locale;
	}

	const preferredLocale = navigator.language;

	if (isLocale(preferredLocale)) {
		localStorage.setItem('locale', preferredLocale);

		return preferredLocale;
	}

	return 'en-US';
}

function isLocale(value: string | null): value is I18nLocale {
	return value !== null && AVAILABLE_LOCALES.includes(value as I18nLocale);
}

type I18nLocale = (typeof AVAILABLE_LOCALES)[number];
type I18nMessageSchema = typeof enUS;
