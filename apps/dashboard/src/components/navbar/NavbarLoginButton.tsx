import { FingerprintIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from '../ui/Button.tsx';

export function NavbarLoginButton() {
	return (
		<Button asChild={true} variant='secondary'>
			<Link href='/api/auth/sign-in'>
				<FingerprintIcon className='size-5 shrink-0' weight='duotone' />
				<span className='truncate'>Login with Discord</span>
			</Link>
		</Button>
	);
}
