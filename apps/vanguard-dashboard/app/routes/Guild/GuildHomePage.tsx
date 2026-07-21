import { UserAddFill } from '@mingcute/react';
import { Bar, BarChart, Tooltip, type TooltipContentProps } from 'recharts';

import { DashboardSectionCard } from '#components/Dashboard/DashboardSectionCard.tsx';
import { GuildContext } from '#context/GuildContext.ts';
import { UserContext } from '#context/UserContext.ts';
import type { Route } from './+types/GuildHomePage';

const data = [
	{
		count: 530,
		name: '07/07',
	},
	{
		count: 720,
		name: '07/08',
	},
	{
		count: 524,
		name: '07/09',
	},
	{
		count: 782,
		name: '07/10',
	},
	{
		count: 465,
		name: '07/11',
	},
	{
		count: 248,
		name: '07/12',
	},
	{
		count: 874,
		name: '07/13',
	},
	{
		count: 753,
		name: '07/13',
	},
	{
		count: 576,
		name: '07/13',
	},
	{
		count: 720,
		name: '07/13',
	},
];

export function loader({ context }: Route.LoaderArgs) {
	const user = context.get(UserContext);
	const guild = context.get(GuildContext);

	return {
		guild,
		user,
	};
}

function ChartTooltip({ active, payload }: TooltipContentProps) {
	const payloadEntry = payload?.[0];

	if (!(active || payloadEntry)) {
		return null;
	}

	return (
		<ul className='rounded-xl border-2 border-zinc-800 bg-zinc-900 p-2 shadow-xs shadow-zinc-950'>
			<li className='flex items-center gap-2 text-sm'>
				<span
					className='size-5 rounded-xs'
					style={{
						backgroundColor: payloadEntry.fill,
					}}
				/>
				<span className='font-bold'>Members</span>
			</li>
			<li className='font-mono font-semibold text-md slashed-zero'>{payloadEntry.value}</li>
		</ul>
	);
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { user } = loaderData;
	const { global_name: globalName, username } = user;

	return (
		<>
			<h1 className='font-bold text-3xl'>Welcome back, {globalName ?? username}!</h1>
			<DashboardSectionCard
				description='View the number of new members joining your Discord community over time.'
				icon={UserAddFill}
				title='New Member Count'
			>
				<BarChart
					cursor='pointer'
					data={data}
					responsive={true}
					style={{
						height: '300px',
						width: '100%',
					}}
				>
					<Tooltip
						content={ChartTooltip}
						cursor={false}
					/>
					<Bar
						activeBar={{
							fill: 'var(--color-rose-500)',
						}}
						dataKey='count'
						fill='var(--color-rose-500)'
						radius={12}
					/>
				</BarChart>
			</DashboardSectionCard>
		</>
	);
}
