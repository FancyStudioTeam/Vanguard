import './CustomizationPage.css';

import { Accordion } from '#components/UI/Accordion.tsx';
import { AccordionBotCustomization } from './components/Accordions/AccordionBotCustomization.tsx';

export default function () {
	return (
		<>
			<h1 className='font-bold text-3xl'>Bot Customization</h1>
			<Accordion
				className='flex flex-col gap-6'
				defaultValue={[
					'bot-customization',
				]}
			>
				<AccordionBotCustomization />
			</Accordion>
		</>
	);
}
