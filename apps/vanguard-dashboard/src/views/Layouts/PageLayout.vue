<template>
	<NavbarComponent />
	<RouterView />
	<FooterComponent />
</template>

<script lang="ts" setup vapor>
	import FooterComponent from '@/components/Layout/Footer/FooterComponent.vue';
	import NavbarComponent from '@/components/Layout/Navbar/NavbarComponent.vue';
</script>
