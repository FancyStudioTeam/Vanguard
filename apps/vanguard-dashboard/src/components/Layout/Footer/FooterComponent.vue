<template>
	<footer uno-flex="~ col">
		<section
			uno-gap-8
			uno-grid="~ cols-1 md:cols-2"
			uno-max-w-7xl
			uno-mx-auto
			uno-p="x-8 y-32"
			uno-w-full
		>
			<FooterInformationSectionComponent />
			<FooterVanguardSectionComponent />
		</section>
		<FooterVanguardTextComponent />
	</footer>
</template>

<script lang="ts" setup vapor>
	import FooterVanguardTextComponent from './FooterVanguardTextComponent.vue';
	import FooterInformationSectionComponent from './Information/FooterInformationSectionComponent.vue';
	import FooterVanguardSectionComponent from './Vanguard/FooterVanguardSectionComponent.vue';
</script>
