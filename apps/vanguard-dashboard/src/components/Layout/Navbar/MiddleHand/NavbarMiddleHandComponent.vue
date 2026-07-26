<template>
	<section uno-flex="~ row" uno-gap-4 uno-items-center uno-justify-center>
		<RouterLink
			active-class="!text-zinc-50"
			uno-text="xs zinc-400 hover:zinc-50"
			uno-transition
			uno-uppercase
			v-for="item in NAVIGATION_ITEMS"
			:key="item.locationName"
			:to="{ name: item.locationName }"
		>
			{{ t(item.localeKey) }}
		</RouterLink>
	</section>
</template>

<script lang="ts" setup vapor>
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	const NAVIGATION_ITEMS: NavigationItem[] = [
		{
			localeKey: 'Layout.Navbar.Links.Dashboard',
			locationName: 'Dashboard',
		},
		{
			localeKey: 'Layout.Navbar.Links.Pricing',
			locationName: 'Pricing',
		},
	];

	interface NavigationItem {
		localeKey: string;
		locationName: string;
	}
</script>
