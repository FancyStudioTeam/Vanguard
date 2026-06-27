import { CheckFill } from '@mingcute/react';

export function PreviewMemberList({ avatarUrl, nickname }: PreviewMemberListProps) {
	return (
		<div className='flex items-center gap-2 rounded-3xl bg-neutral-800 p-2'>
			<span className='relative shrink-0'>
				<img
					alt="Vanguard's Profile Icon"
					className='size-10 rounded-full'
					src={avatarUrl}
				/>
				<span className='absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-neutral-800 bg-emerald-500' />
			</span>
			<span className='truncate font-semibold'>{nickname ?? 'Vanguard'}</span>
			<span className='flex items-center gap-0.5 rounded-sm bg-indigo-500 px-1.5 py-0.5 text-indigo-50 text-xs uppercase'>
				<CheckFill className='size-3' />
				<span>App</span>
			</span>
		</div>
	);
}

export interface PreviewMemberListProps {
	avatarUrl: string;
	nickname: string | null;
}
