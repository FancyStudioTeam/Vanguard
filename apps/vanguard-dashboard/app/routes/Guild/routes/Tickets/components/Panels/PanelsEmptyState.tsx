import { TicketIcon } from '@phosphor-icons/react';

export function PanelsEmptyState() {
	return (
		<section className='flex h-75 items-center justify-center rounded-xl border-2 border-neutral-700 border-dashed p-6'>
			<section className='flex w-full max-w-xs flex-col gap-2 text-center'>
				<section className='mx-auto size-min rounded-md bg-neutral-800 p-2 [&>svg]:size-7'>
					<TicketIcon weight='fill' />
				</section>
				<h2 className='font-bold text-md'>No Ticket Panels Yet</h2>
				<p className='text-balance text-neutral-400 text-sm'>
					You can start by creating a panel to manage your tickets.
				</p>
			</section>
		</section>
	);
}
