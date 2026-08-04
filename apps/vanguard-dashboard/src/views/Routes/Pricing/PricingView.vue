<template>
	<main uno-flex="~ col" uno-gap-12 uno-max-w-7xl uno-mx-auto uno-p="x-8 y-32" uno-w-full>
		<h1
			id="premium-title"
			uno-font-bold
			uno-max-w-5xl
			uno-mx-auto
			uno-text="3xl balance center md:5xl"
		>
			{{ premiumTitle }}
		</h1>
		<ComparisonTableComponent />
	</main>
</template>

<script lang="ts" setup vapor>
	import { useSeoMeta } from '@unhead/vue';
	import { animate, splitText, stagger, type TextSplitter } from 'animejs';
	import { computed, nextTick, onMounted, watch } from 'vue';
	import { useI18n } from 'vue-i18n';

	import ComparisonTableComponent from './components/ComparisonTable/ComparisonTableComponent.vue';

	const { t } = useI18n();

	const premiumTitle = computed(() => t('Views.Premium.Title'));

	let lines: TextSplitter | null = null;

	useSeoMeta({
		robots: 'follow, index',
		title: computed(() => t('SEO.Premium.Title')),
	});

	watch(premiumTitle, async () => {
		await nextTick();

		animatePremiumTitle();
	});

	onMounted(animatePremiumTitle);

	function animatePremiumTitle() {
		lines?.revert();

		const EffectDuration = 550;
		const EffectStaggerDuration = 150;

		lines = splitText('#premium-title', {
			lines: {
				wrap: 'clip',
			},
		});

		lines.addEffect(({ lines }) =>
			animate(lines, {
				delay: stagger(EffectStaggerDuration),
				duration: EffectDuration,
				ease: 'out(3)',
				y: [
					{
						to: [
							'100%',
							'0%',
						],
					},
				],
			}),
		);
	}
</script>
