<template>
	<RouterView />
</template>

<style>
	html {
		scrollbar-color: var(--colors-rose-500) transparent;
	}
</style>

<script lang="ts" setup vapor>
	import { useHead, useSeoMeta } from '@unhead/vue';
	import { watch } from 'vue';
	import { useI18n } from 'vue-i18n';

	const { patch } = useHead();
	const { locale } = useI18n();

	useSeoMeta({
		title: 'Welcome',
		titleTemplate: '%s - Vanguard',
	});

	watch(locale, (updatedLocale) => {
		localStorage.setItem('locale', updatedLocale);

		patch({
			htmlAttrs: {
				lang: updatedLocale,
			},
		});
	});

	console.log(
		'%cVanguard\n%cPowered by %cFancyStudio™',
		'font-family: General Sans; font-size: 75px; font-weight: bold;',
		'font-family: General Sans; font-size: 25px; font-weight: normal;',
		'font-family: General Sans; font-size: 25px; font-style: italic; font-weight: bold;',
	);
</script>
