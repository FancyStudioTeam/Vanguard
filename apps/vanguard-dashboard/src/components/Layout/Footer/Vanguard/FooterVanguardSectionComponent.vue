<template>
	<ul uno-flex="~ col" uno-gap-2>
		<span uno-font-bold uno-text-xs uno-uppercase>Vanguard</span>
		<ul>
			<template v-for="link in FOOTER_LINKS" :key="link.locationName">
				<li>
					<RouterLink
						uno-font-semibold
						uno-text="sm zinc-400 hover:zinc-50"
						uno-transition
						:to="{ name: link.locationName }"
					>
						{{ t(link.localeKey) }}
					</RouterLink>
				</li>
			</template>
		</ul>
	</ul>
</template>

<script lang="ts" setup vapor>
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	const FOOTER_LINKS: FooterLink[] = [
		{
			localeKey: 'Layout.Footer.Vanguard.Dashboard',
			locationName: 'Dashboard',
		},
		{
			localeKey: 'Layout.Footer.Vanguard.Premium',
			locationName: 'Premium',
		},
	];

	interface FooterLink {
		localeKey: string;
		locationName: string;
	}
</script>
