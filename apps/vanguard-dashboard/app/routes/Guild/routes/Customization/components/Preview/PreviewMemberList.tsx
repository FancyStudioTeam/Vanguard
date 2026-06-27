import { CheckFill } from '@mingcute/react';

export function PreviewMemberList() {
	return (
		<div className='flex items-center gap-2 rounded-full bg-neutral-800 p-2'>
			<span className='relative'>
				<img
					alt="Vanguard's Profile Icon"
					className='size-10 rounded-full'
					src='https://cdn.discordapp.com/avatars/1447604099465085010/63a8a4b7158c90ce2ea2e716af1b8b27.webp?size=1024'
				/>
				<span className='absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-neutral-800 bg-emerald-500' />
			</span>
			<ul>
				<li className='flex items-center gap-2 font-semibold'>
					<span>Vanguard</span>
					<span className='flex items-center gap-0.5 rounded-sm bg-indigo-500 px-1.5 py-0.5 text-xs uppercase'>
						<CheckFill className='size-3' />
						<span>App</span>
					</span>
				</li>
				<li className='text-neutral-400 text-xs'>vanguard.fancystudio.xyz</li>
			</ul>
		</div>
	);
}
