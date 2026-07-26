<template>
	<RouterLink
		uno-active-scale-95
		uno-flex="~ row"
		uno-focus-outline-none
		uno-font-bold
		uno-gap-2
		uno-hover-opacity-75
		uno-items-center
		uno-select-none
		uno-text-xl
		uno-transition
		:to="{ name: 'Home' }"
	>
		<VanguardSymbolComponent uno-size-5 />
		<span>Vanguard</span>
	</RouterLink>
</template>

<script lang="ts" setup vapor>
	import VanguardSymbolComponent from '@/components/Branding/VanguardSymbolComponent.vue';
</script>
