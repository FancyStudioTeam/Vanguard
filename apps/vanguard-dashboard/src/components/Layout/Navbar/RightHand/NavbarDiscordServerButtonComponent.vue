<template>
	<button type="button" uno-button="~ outline size-default" @click="handleDiscordServerButton">
		{{ t("Layout.Navbar.Buttons.DiscordServer") }}
	</button>
</template>

<script lang="ts" setup vapor>
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	const handleDiscordServerButton = () =>
		window.open('https://www.fancystudio.xyz/discord', '_blank');
</script>
