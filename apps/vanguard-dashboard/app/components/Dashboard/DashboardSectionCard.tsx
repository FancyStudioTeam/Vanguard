import type { ComponentType, ReactNode } from 'react';
export function DashboardSectionCard({
	children,
	description,
	icon: Icon,
	title,
}: DashboardSectionCardProps) {
	return (
		<section className='divide-y-2 divide-zinc-800 rounded-3xl bg-zinc-900 *:p-6'>
			<header className='flex flex-row items-center gap-4'>
				<Icon className='size-7.5 shrink-0' />
				<ul className='min-w-0'>
					<li className='truncate font-bold text-md'>{title}</li>
					<li className='font-semibold text-sm text-zinc-400'>{description}</li>
				</ul>
			</header>
			{children}
		</section>
	);
}

export interface DashboardSectionCardProps {
	children: ReactNode;
	description: string;
	icon: ComponentType<{
		className?: string;
	}>;
	title: string;
}
