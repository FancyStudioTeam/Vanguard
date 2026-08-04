<template>
	<section uno-flex="~ row" uno-gap-2 uno-items-center uno-justify-end>
		<NavbarPremiumButtonComponent />
		<NavbarLocaleSelectorComponent />
	</section>
</template>

<script lang="ts" setup vapor>
	import NavbarLocaleSelectorComponent from './NavbarLocaleSelectorComponent.vue';
	import NavbarPremiumButtonComponent from './NavbarPremiumButtonComponent.vue';
</script>
