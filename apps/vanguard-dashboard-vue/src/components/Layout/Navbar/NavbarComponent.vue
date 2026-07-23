<template>
	<header uno-backdrop-blur-xs uno-fixed uno-items-center uno-top-0 uno-w-full uno-z-10>
		<nav uno-gap-4 uno-grid="~ cols-2" uno-max-w-7xl uno-mx-auto uno-p="x-8 y-2" uno-w-full>
			<NavbarLeftHandComponent />
			<NavbarRightHandComponent />
		</nav>
	</header>
</template>

<script lang="ts" setup vapor>
	import NavbarLeftHandComponent from './NavbarLeftHandComponent.vue';
	import NavbarRightHandComponent from './NavbarRightHandComponent.vue';
</script>
