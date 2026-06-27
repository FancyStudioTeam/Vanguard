import { CheckFill } from '@mingcute/react';

export function PreviewMemberProfile({
	avatarUrl,
	bannerUrl,
	biography,
	nickname,
}: PreviewMemberProfileProps) {
	return (
		<div className='overflow-hidden rounded-3xl bg-neutral-800'>
			{bannerUrl ? (
				<header
					className='h-25 bg-center bg-cover bg-no-repeat'
					style={{
						backgroundImage: `url(${bannerUrl})`,
					}}
				/>
			) : (
				<header className='h-25 bg-rose-500' />
			)}
			<section className='flex -translate-y-10 flex-col gap-2 px-4'>
				<span className='relative block size-fit'>
					<img
						alt="Vanguard's Profile Icon"
						className='size-20 rounded-full border-4 border-neutral-800'
						src={avatarUrl}
					/>
					<span className='absolute right-0 bottom-0 size-7 rounded-full border-4 border-neutral-800 bg-emerald-500' />
				</span>
				<ul className='min-w-0'>
					<li className='flex items-center gap-2 font-semibold'>
						<span className='truncate text-xl'>{nickname ?? 'Vanguard'}</span>
						<span className='flex items-center gap-0.5 rounded-sm bg-indigo-500 px-1.5 py-0.5 text-indigo-50 text-xs uppercase'>
							<CheckFill className='size-3' />
							<span>App</span>
						</span>
					</li>
					<li className='text-neutral-400 text-sm'>Vanguard#1075</li>
				</ul>
				<p className='whitespace-normal text-sm'>{biography}</p>
			</section>
		</div>
	);
}

export interface PreviewMemberProfileProps {
	avatarUrl: string;
	bannerUrl: string | null;
	biography: string | null;
	nickname: string | null;
}
