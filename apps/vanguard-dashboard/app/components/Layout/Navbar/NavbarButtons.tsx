import { ButtonVariants } from '@vanguard/ui/Button.js';

export function NavbarButtons() {
	return (
		<section className='hidden items-center gap-2 sm:flex'>
			<a
				className={ButtonVariants({
					variant: 'outline',
				})}
				href='https://www.fancystudio.xyz/discord'
				rel='noopener'
				target='_blank'
			>
				Discord Server
			</a>
			<a
				className={ButtonVariants()}
				href='/dashboard'
			>
				Dashboard
			</a>
		</section>
	);
}
