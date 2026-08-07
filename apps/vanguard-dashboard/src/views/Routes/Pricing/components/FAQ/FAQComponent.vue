<template>
	<section uno-flex="~ col" uno-gap-8>
		<h2 uno-font-bold uno-text="center 3xl">
			{{ t("Views.Premium.FrequentlyAskedQuestions.Title") }}
		</h2>
		<AccordionRoot
			type="multiple"
			uno-bg-zinc-900
			uno-divide="y-2 zinc-800"
			uno-rounded-3xl
			:collapsible="true"
		>
			<template v-for="question in FREQUENTLY_ASKED_QUESTIONS" :key="question.value">
				<AccordionItem :value="question.value">
					<AccordionTrigger
						uno-cursor-pointer
						uno-focus-none
						uno-font-bold
						uno-p-6
						uno-text="left md"
						uno-w-full
					>
						{{ t(question.headerLocaleKey) }}
					</AccordionTrigger>
					<AccordionContent uno-p="b-6 x-6" uno-text="balance sm zinc-400">
						{{ t(question.contentLocaleKey) }}
					</AccordionContent>
				</AccordionItem>
			</template>
		</AccordionRoot>
	</section>
</template>

<script lang="ts" setup vapor>
	import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	const FREQUENTLY_ASKED_QUESTIONS: FreqentlyAskedQuestion[] = [
		{
			contentLocaleKey:
				'Views.Premium.FrequentlyAskedQuestions.Sections.AboutPremium.Content',
			headerLocaleKey: 'Views.Premium.FrequentlyAskedQuestions.Sections.AboutPremium.Header',
			value: 'About Premium',
		},
		{
			contentLocaleKey: 'Views.Premium.FrequentlyAskedQuestions.Sections.Revenue.Content',
			headerLocaleKey: 'Views.Premium.FrequentlyAskedQuestions.Sections.Revenue.Header',
			value: 'Revenue',
		},
		{
			contentLocaleKey: 'Views.Premium.FrequentlyAskedQuestions.Sections.Currency.Content',
			headerLocaleKey: 'Views.Premium.FrequentlyAskedQuestions.Sections.Currency.Header',
			value: 'Currency',
		},
		{
			contentLocaleKey:
				'Views.Premium.FrequentlyAskedQuestions.Sections.PaymentSecurity.Content',
			headerLocaleKey:
				'Views.Premium.FrequentlyAskedQuestions.Sections.PaymentSecurity.Header',
			value: 'Payment Security',
		},
	];

	interface FreqentlyAskedQuestion {
		contentLocaleKey: string;
		headerLocaleKey: string;
		value: string;
	}
</script>
