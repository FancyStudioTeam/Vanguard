'use client';

import { FingerprintIcon } from '@phosphor-icons/react';
import { useSession } from '#/hooks/useSession.ts';
import { Button } from '../ui/Button.tsx';

export function NavbarLoginButton() {
	const { signIn } = useSession();
	const handleSignIn = () => signIn();

	return (
		<Button onClick={handleSignIn} variant='ghost'>
			<FingerprintIcon className='size-5 shrink-0' weight='duotone' />
			<span className='truncate'>Login with Discord</span>
		</Button>
	);
}
