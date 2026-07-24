<template>
	<main uno-grid uno-h-dvh uno-place-content-center>
		<section uno-flex="~ col" uno-gap-4>
			<h1 uno-font-bold uno-text="7xl center">404</h1>
			<RouterLink uno-button="~ filled size-default" :to="{ name: 'Home' }">
				{{ t("Views.NotFound.Buttons.ReturnHome") }}
			</RouterLink>
		</section>
	</main>
</template>

<script lang="ts" setup vapor>
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>
