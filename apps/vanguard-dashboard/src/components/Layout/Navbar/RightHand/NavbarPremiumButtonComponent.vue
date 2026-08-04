<template>
	<RouterLink uno-button="~ filled size-default" :to="{ name: 'Premium' }">
		<span uno-i-mingcute-vip-1-fill uno-size-5 />
		<span>
			{{ t("Layout.Navbar.Buttons.Upgrade") }}
		</span>
	</RouterLink>
</template>

<script lang="ts" setup vapor>
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>
