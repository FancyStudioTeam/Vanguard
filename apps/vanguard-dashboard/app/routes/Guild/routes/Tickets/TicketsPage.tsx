import { PlusCircleIcon } from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';
import { match, P } from 'ts-pattern';

import { Button } from '#components/UI/Button.tsx';
import { GuildContext } from '#context/GuildContext.ts';
import { UserContext } from '#context/UserContext.ts';
import { getTicketsConfiguration } from '#server/utils/API/getTicketsConfiguration.ts';
import type { Route } from './+types/TicketsPage.ts';
import { PanelsEmptyState } from './components/Panels/PanelsEmptyState.tsx';
import { PanelsTable } from './components/Panels/PanelsTable.tsx';

export async function loader({ context, request }: Route.LoaderArgs) {
	const guild = context.get(GuildContext);
	const user = context.get(UserContext);

	const { id: guildId } = guild;

	const ticketsConfiguration = await getTicketsConfiguration(guildId, request);

	return {
		guild,
		ticketsConfiguration,
		user,
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { ticketsConfiguration } = loaderData;
	const { panels } = ticketsConfiguration;

	return (
		<div className='flex flex-col gap-6'>
			<section className='flex items-center justify-between'>
				<h1 className='font-bold text-xl'>Ticket Panels</h1>
				<Button variant='secondary'>
					<PlusCircleIcon
						className='size-5 shrink-0'
						weight='fill'
					/>
					<span>Create Panel</span>
				</Button>
			</section>

			{match(panels)
				.returnType<ReactNode>()
				.with(
					P.when(({ length }) => !length),
					() => <PanelsEmptyState />,
				)
				.otherwise((panels) => (
					<PanelsTable panels={panels} />
				))}
		</div>
	);
}
