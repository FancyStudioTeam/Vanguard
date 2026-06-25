import { Link } from 'react-router';

import { ButtonVariants } from '#components/UI/Button.tsx';

export function NavbarButtons() {
	return (
		<section className='hidden items-center gap-2 sm:flex'>
			<Link
				className={ButtonVariants({
					variant: 'outline',
				})}
				target='_blank'
				to='https://www.fancystudio.xyz/discord'
			>
				Discord Server
			</Link>
			<Link
				className={ButtonVariants()}
				to='/dashboard'
			>
				Dashboard
			</Link>
		</section>
	);
}
