<template>
	<section uno-flex="~ row" uno-gap-2 uno-items-center uno-justify-end>
		<NavbarDiscordServerButtonComponent />
		<NavbarLocaleSelectorComponent />
	</section>
</template>

<script lang="ts" setup vapor>
	import NavbarDiscordServerButtonComponent from './NavbarDiscordServerButtonComponent.vue';
	import NavbarLocaleSelectorComponent from './NavbarLocaleSelectorComponent.vue';
</script>
