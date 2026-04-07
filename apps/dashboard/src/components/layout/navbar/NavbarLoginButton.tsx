import { FingerprintIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Button } from '#components/ui/Button.tsx';

export function NavbarLoginButton() {
	return (
		<Button
			asChild={true}
			className='w-full max-w-40'
			variant='secondary'
		>
			<Link
				href='/api/auth/sign-in'
				prefetch={false}
			>
				<FingerprintIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
				<span className='truncate'>Login with Discord</span>
			</Link>
		</Button>
	);
}
