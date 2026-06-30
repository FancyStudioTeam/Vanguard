import './CustomizationPage.css';

import { Accordion } from '#components/UI/Accordion.tsx';
import type { Route } from './+types/CustomizationPage.ts';
import { AccordionBotCustomization } from './components/Accordions/AccordionBotCustomization.tsx';

export function loader({ params }: Route.LoaderArgs) {
	const { guildId } = params;

	return {
		guildId,
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { guildId } = loaderData;

	return (
		<>
			<h1 className='font-bold text-3xl'>Bot Customization</h1>
			<Accordion
				className='flex flex-col gap-6'
				defaultValue={[
					'bot-customization',
				]}
			>
				<AccordionBotCustomization guildId={guildId} />
			</Accordion>
		</>
	);
}
