<template>
	<header uno-backdrop-blur-xs uno-fixed uno-items-center uno-top-0 uno-w-full uno-z-10>
		<nav
			uno-flex
			uno-h-15
			uno-items-center
			uno-max-w-7xl
			uno-mx-auto
			uno-p="x-8 y-4"
			uno-w-full
		>
			<RouterLink
				uno-active="scale-95"
				uno-font-bold
				uno-hover="opacity-75"
				uno-text-xl
				uno-transition
				:to="{ name: 'Home' }"
			>
				Vanguard
			</RouterLink>
		</nav>
	</header>
	<RouterView />
	<footer>
		<p
			uno-bg="clip-text linear-to-b"
			uno-font="bold pixel"
			uno-from-zinc-800
			uno-leading-none
			uno-text="22vw center transparent"
			uno-to-transparent
			uno-tracking-tighter
			uno-uppercase
		>
			Vanguard
		</p>
	</footer>
</template>

<script lang="ts" setup vapor>
	const handleDiscordServerButton = () =>
		window.location.replace('https://www.fancystudio.xyz/discord');
</script>
