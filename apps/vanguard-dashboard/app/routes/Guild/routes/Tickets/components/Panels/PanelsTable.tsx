import type { APIGuildTicketPanel } from '@vanguard/api-types/interfaces';

import { useRevalidator } from 'react-router';

import { classNames } from '#utils/Tailwind/classNames.ts';
import { PanelActions } from '../PanelActions/PanelActions.tsx';

export function PanelsTable({ guildId, panels }: PanelsTableProps) {
	const revalidator = useRevalidator();

	return (
		<section className='overflow-hidden rounded-xl border-2 border-neutral-800'>
			<table className='size-full border-collapse bg-neutral-900'>
				<thead className='border-neutral-800 border-b-2'>
					<tr className='*:p-4 *:text-left *:text-neutral-400 *:text-xs *:uppercase'>
						<th>Name</th>
						<th>Type</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{panels.map(({ enabled, title, type, panel_id: panelId }) => (
						<tr
							className='border-neutral-800 not-last:border-b-2 *:px-4 *:py-2 *:text-md'
							key={panelId}
						>
							<td>{title}</td>
							<td>
								<span className='rounded-full bg-neutral-800 px-2 py-1 font-bold text-neutral-400 text-xs uppercase'>
									{String(type)}
								</span>
							</td>
							<td>
								<span
									className={classNames(
										'rounded-full bg-neutral-800 px-2 py-1 font-bold text-xs uppercase',
										enabled ? 'text-emerald-500' : 'text-rose-500',
									)}
								>
									{enabled ? 'Enabled' : 'Disabled'}
								</span>
							</td>
							<td>
								<PanelActions
									guildId={guildId}
									panelId={panelId}
									revalidator={revalidator}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

export interface PanelsTableProps {
	guildId: string;
	panels: APIGuildTicketPanel[];
}
