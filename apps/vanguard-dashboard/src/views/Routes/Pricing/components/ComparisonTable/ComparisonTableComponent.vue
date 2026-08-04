<template>
	<table uno-table-auto uno-w-full>
		<thead>
			<tr
				class="*:p-4 *:text-center *:text-xs *:uppercase *:first:rounded-l-full *:last:rounded-r-full"
				uno-bg-zinc-900
			>
				<th>
					{{ t("Views.Premium.ComparisonTable.Header.Comparison") }}
				</th>
				<th>
					{{ t("Views.Premium.ComparisonTable.Header.Free") }}
				</th>
				<th>
					{{ t("Views.Premium.ComparisonTable.Header.Premium") }}
				</th>
			</tr>
		</thead>
		<tbody>
			<template v-for="comparisonRow in COMPARISON_ROWS" :key="comparisonRow.localeKey">
				<tr uno-h="12.5">
					<td uno-font-semibold uno-p-4 uno-text="sm zinc-400">
						{{ t(comparisonRow.localeKey) }}
					</td>
					<template
						v-for="([ planName, planValue ]) in Object.entries(comparisonRow.plans)"
						:key="planName"
					>
						<td uno-p-4>
							<template v-if="typeof planValue === 'number'">
								<span uno-block uno-font-bold uno-mx-auto uno-text="center sm">
									{{ planValue }}
								</span>
							</template>
							<template v-else>
								<span uno-grid uno-place-content-center>
									<span
										uno-size-5
										:class="planValue ? 'i-mingcute-check-circle-fill' : 'i-mingcute-close-circle-fill'"
									/>
								</span>
							</template>
						</td>
					</template>
				</tr>
			</template>
		</tbody>
	</table>
</template>

<script lang="ts" setup vapor>
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	const COMPARISON_ROWS: ComparisonRow[] = [
		{
			localeKey: 'Views.Premium.ComparisonTable.Features.BotCustomization',
			plans: {
				free: false,
				premium: true,
			},
		},
	];

	interface ComparisonRow {
		localeKey: string;
		plans: {
			free: ComparisonPlanValue;
			premium: ComparisonPlanValue;
		};
	}

	type ComparisonPlanValue = boolean | number;
</script>
