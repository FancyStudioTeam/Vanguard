import './CustomizationPage.css';

import type { Route } from './+types/CustomizationPage.ts';
import { BotCustomization } from './components/BotCustomization/BotCustomization.tsx';

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
			<BotCustomization guildId={guildId} />
		</>
	);
}
