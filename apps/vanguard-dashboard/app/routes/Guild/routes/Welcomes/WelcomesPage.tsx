import { Accordion } from '#components/UI/Accordion.tsx';
import { AccordionWelcomeConfiguration } from './components/Accordions/AccordionWelcomeConfiguration.tsx';

export default function () {
	return (
		<>
			<h1 className='font-bold text-3xl'>Welcomes</h1>
			<Accordion
				className='flex flex-col gap-6'
				defaultValue={[
					'welcomes-configuration',
				]}
			>
				<AccordionWelcomeConfiguration />
			</Accordion>
		</>
	);
}
