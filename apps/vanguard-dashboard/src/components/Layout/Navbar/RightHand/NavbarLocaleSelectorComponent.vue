<template>
	<DropdownMenuRoot v-model:open="openState" :modal="false">
		<DropdownMenuTrigger
			uno-focus-outline-none
			:aria-label="t('Layout.Navbar.Buttons.LocalesDropdown')"
		>
			<span uno-button="~ filled-secondary size-icon">
				<span uno-i-mingcute-translate-2-fill uno-rounded-full uno-size-5 />
			</span>
		</DropdownMenuTrigger>
		<DropdownMenuPortal>
			<DropdownMenuContent uno-dropdown-menu :side-offset="10">
				<DropdownMenuGroup uno-p-2>
					<template v-for="locale in LOCALES" :key="locale.code">
						<DropdownMenuItem
							uno-dropdown-menu-item
							@click="handleLocaleUpdate(locale.code)"
						>
							<span uno-size-5 :class="locale.icon" />
							<span>{{ locale.name }}</span>
						</DropdownMenuItem>
					</template>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>

<script lang="ts" setup vapor>
	import {
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuPortal,
		DropdownMenuRoot,
		DropdownMenuTrigger,
	} from 'reka-ui';
	import { computed, ref } from 'vue';
	import { useI18n } from 'vue-i18n';

	const { availableLocales, locale, t } = useI18n();
	const openState = ref(false);

	const handleLocaleUpdate = (localeCode: string) => {
		locale.value = localeCode;
	};

	const LOCALE_SETTINGS: LocaleSettingsMap = {
		'en-US': {
			icon: 'i-circle-flags-us',
			name: 'English (US)',
		},
		'es-ES': {
			icon: 'i-circle-flags-es',
			name: 'Español (ES)',
		},
	};

	const LOCALES = computed(() =>
		availableLocales.map((localeCode) => ({
			code: localeCode,
			...getPrettyLocaleSettings(localeCode),
		})),
	);

	const getPrettyLocaleSettings = (localeCode: string): LocaleSettings =>
		Object.hasOwn(LOCALE_SETTINGS, localeCode)
			? (LOCALE_SETTINGS[localeCode] as LocaleSettings)
			: {
					icon: 'i-circle-flags-earth',
					name: 'Unknown Language',
				};

	interface LocaleSettings {
		icon: string;
		name: string;
	}

	type LocaleSettingsMap = Record<string, LocaleSettings>;
</script>
