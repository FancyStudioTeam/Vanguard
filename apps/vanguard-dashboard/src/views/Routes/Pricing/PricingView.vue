<template>
	<main uno-gap-4 uno-max-w-7xl uno-mx-auto uno-p="x-8 y-24" uno-w-full>
		<ComparisonTableComponent />
	</main>
</template>

<script lang="ts" setup vapor>
	import { useSeoMeta } from '@unhead/vue';
	import { computed } from 'vue';
	import { useI18n } from 'vue-i18n';

	import ComparisonTableComponent from './components/ComparisonTable/ComparisonTableComponent.vue';

	const { t } = useI18n();

	useSeoMeta({
		robots: 'follow, index',
		title: computed(() => t('SEO.Pricing.Title')),
	});
</script>
