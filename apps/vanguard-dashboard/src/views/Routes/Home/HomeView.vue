<template>
	<main uno-h-dvh></main>
</template>

<script lang="ts" setup vapor>
	import { useSeoMeta } from '@unhead/vue';
	import { computed } from 'vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	useSeoMeta({
		robots: 'follow, index',
		title: computed(() => t('SEO.Home.Title')),
	});
</script>
