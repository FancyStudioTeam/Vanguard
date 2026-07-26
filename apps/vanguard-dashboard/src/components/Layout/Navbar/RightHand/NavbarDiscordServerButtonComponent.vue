<template>
	<a
		href="https://www.fancystudio.xyz/discord"
		target="_blank"
		uno-button="~ outline size-default"
	>
		{{ t("Layout.Navbar.Buttons.DiscordServer") }}
	</a>
</template>

<script lang="ts" setup vapor>
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>
