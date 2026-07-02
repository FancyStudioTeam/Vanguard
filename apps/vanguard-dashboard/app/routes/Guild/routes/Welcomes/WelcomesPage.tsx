import { Accordion } from '#components/UI/Accordion.tsx';
import type { Route } from './+types/WelcomesPage.ts';
import { AccordionWelcomeConfiguration } from './components/Accordions/AccordionWelcomeConfiguration.tsx';

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
			<h1 className='font-bold text-3xl'>Welcomes</h1>
			<Accordion
				className='flex flex-col gap-6'
				defaultValue={[
					'welcomes-configuration',
				]}
			>
				<AccordionWelcomeConfiguration guildId={guildId} />
			</Accordion>
		</>
	);
}
