<template>
	<ul uno-flex="~ col" uno-gap-2>
		<li>
			<VanguardSymbolComponent uno-size-10 />
		</li>
		<li uno-font-bold uno-text-2xl>Vanguard</li>
		<li>
			<a
				href="https://www.fancystudio.xyz"
				target="_blank"
				uno-font-semibold
				uno-text="sm zinc-400 hover:zinc-50"
				uno-transition
			>
				© {{ new Date().getFullYear() }} FancyStudio™
			</a>
		</li>
	</ul>
</template>

<script lang="ts" setup vapor>
	import VanguardSymbolComponent from '@/components/Branding/VanguardSymbolComponent.vue';
</script>
