<template>
	<header
		uno-bg-zinc-950
		uno-items-center
		uno-top-0
		uno-w-full
		uno-z-10
		:class="$route.meta.useFullViewport ? 'fixed' : 'sticky'"
	>
		<nav uno-grid="~ cols-1 md:cols-2" uno-max-w-7xl uno-mx-auto uno-p="x-8 y-2" uno-w-full>
			<NavbarLeftHandComponent />
			<NavbarRightHandComponent />
		</nav>
	</header>
</template>

<script lang="ts" setup vapor>
	import NavbarLeftHandComponent from './LeftHand/NavbarLeftHandComponent.vue';
	import NavbarRightHandComponent from './RightHand/NavbarRightHandComponent.vue';
</script>
