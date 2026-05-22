import { GridFourIcon } from '@phosphor-icons/react';

import { ButtonVariants } from '#components/UI/Button.tsx';

export function NavbarButton() {
	return (
		<a
			className={ButtonVariants({
				className: 'max-w-50',
				variant: 'secondary',
			})}
			href='/dashboard'
		>
			<GridFourIcon
				className='size-5 shrink-0'
				weight='fill'
			/>
			<span className='truncate'>Manage Guilds</span>
		</a>
	);
}
