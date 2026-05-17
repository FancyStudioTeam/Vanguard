import { InfoIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { match, P } from 'ts-pattern';

import { Alert, AlertDescription } from '#components/UI/Alert.tsx';
import { Button } from '#components/UI/Button.tsx';
import { GuildContext } from '#context/GuildContext.ts';
import { UserContext } from '#context/UserContext.ts';
import { getTicketsConfiguration } from '#server/utils/API/getTicketsConfiguration.ts';
import { classNames } from '#utils/Tailwind/classNames.ts';
import type { Route } from './+types/index';

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
	const { panels } = ticketsConfiguration ?? {};

	return (
		<div className='flex flex-col gap-6'>
			<section className='flex items-center justify-between'>
				<h1 className='font-bold text-xl'>Tickets</h1>
				<Button variant='secondary'>Create Panel</Button>
			</section>

			{match(panels)
				.returnType<ReactNode>()
				.with(
					P.when(({ length }) => !length),
					() => (
						<Alert>
							<InfoIcon
								className='size-5 shrink-0'
								weight='fill'
							/>
							<AlertDescription>This server does not have any panel created.</AlertDescription>
						</Alert>
					),
				)
				.otherwise((panels) => (
					<section className='overflow-hidden rounded-xl border-2 border-neutral-800'>
						<table className='size-full bg-neutral-900'>
							<thead className='border-neutral-800 border-b-2'>
								<tr className='*:p-4 *:text-left *:text-neutral-400 *:text-sm'>
									<th>Name</th>
									<th>Type</th>
									<th>Channel ID</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{panels.map(({ channel_id, enabled, title, type, panel_id }) => (
									<tr
										className='*:p-4 *:text-sm'
										key={panel_id}
									>
										<td>{title}</td>
										<td>{type}</td>
										<td>{channel_id}</td>
										<td>
											<span
												className={classNames(
													'font-bold text-xs uppercase',
													enabled ? 'text-emerald-500' : 'text-rose-500',
												)}
											>
												{enabled ? 'Enabled' : 'Disabled'}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				))}
		</div>
	);
}
