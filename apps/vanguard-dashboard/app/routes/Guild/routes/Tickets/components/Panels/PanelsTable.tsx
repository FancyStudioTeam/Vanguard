import type { APIGuildTicketPanel } from '@vanguard/api-types/interfaces';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function PanelsTable({ panels }: PanelsTableProps) {
	return (
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
							<td>{String(type)}</td>
							<td>{channel_id}</td>
							<td>
								<span className={classNames('font-bold text-xs uppercase', enabled ? 'text-emerald-500' : 'text-rose-500')}>
									{enabled ? 'Enabled' : 'Disabled'}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

export interface PanelsTableProps {
	panels: APIGuildTicketPanel[];
}
