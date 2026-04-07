import { IdentificationCardIcon } from '@phosphor-icons/react/dist/ssr';
import type { GuildFooterProps } from './GuildFooter.tsx';

export function GuildFooterInfo({ id, name }: GuildFooterInfoProps) {
	return (
		<ul className='min-w-0'>
			<li className='truncate font-bold'>{name}</li>
			<li className='flex items-center gap-2 text-neutral-400 text-sm'>
				<IdentificationCardIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
				<span className='truncate'>{id}</span>
			</li>
		</ul>
	);
}

export type GuildFooterInfoProps = Pick<GuildFooterProps, 'id' | 'name'>;
