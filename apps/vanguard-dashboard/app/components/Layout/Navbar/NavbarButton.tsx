import { GridFourIcon } from '@phosphor-icons/react';
import { Link } from 'react-router';

import { buttonVariants } from '#components/UI/Button.tsx';

export function NavbarButton() {
	return (
		<Link
			className={buttonVariants({
				className: 'max-w-50',
				variant: 'secondary',
			})}
			to={'/dashboard'}
		>
			<GridFourIcon
				className='size-5 shrink-0'
				weight='fill'
			/>
			<span className='truncate'>Manage Guilds</span>
		</Link>
	);
}
