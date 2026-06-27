import { CheckFill } from '@mingcute/react';

export function PreviewMemberProfile({ biography, nickname }: PreviewMemberProfileProps) {
	return (
		<div className='overflow-hidden rounded-3xl bg-neutral-800'>
			<header className='h-25 bg-rose-500' />
			<section className='flex -translate-y-10 flex-col gap-2 px-4'>
				<span className='relative block size-fit'>
					<img
						alt="Vanguard's Profile Icon"
						className='size-20 rounded-full border-4 border-neutral-800'
						src='https://cdn.discordapp.com/avatars/1447604099465085010/63a8a4b7158c90ce2ea2e716af1b8b27.webp?size=1024'
					/>
					<span className='absolute right-0 bottom-0 size-7 rounded-full border-4 border-neutral-800 bg-emerald-500' />
				</span>
				<ul>
					<li className='flex items-center gap-2 font-semibold'>
						<span className='truncate text-xl'>{nickname}</span>
						<span className='flex items-center gap-0.5 rounded-sm bg-indigo-500 px-1.5 py-0.5 text-xs uppercase'>
							<CheckFill className='size-3' />
							<span>App</span>
						</span>
					</li>
					<li className='text-neutral-400 text-sm'>Vanguard#1075</li>
				</ul>
				<p className='text-sm'>{biography}</p>
			</section>
		</div>
	);
}

export interface PreviewMemberProfileProps {
	biography: string;
	nickname: string;
}
