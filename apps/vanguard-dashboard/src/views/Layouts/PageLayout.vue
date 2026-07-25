<template>
	<NavbarComponent />
	<RouterView />
	<footer uno-p-8>
		<p
			id="vanguard-text"
			uno-bg="clip-text linear-to-b"
			uno-font-bold
			uno-from-zinc-400
			uno-leading-none
			uno-text="center transparent"
			uno-to-transparent
			uno-tracking-tighter
			uno-uppercase
		>
			Vanguard
		</p>
	</footer>
</template>

<style>
	#vanguard-text {
		/* biome-ignore lint/correctness/noUnknownProperty: (x) */
		text-fit: grow;
	}
</style>

<script lang="ts" setup vapor>
	import NavbarComponent from '@/components/Layout/Navbar/NavbarComponent.vue';
</script>
