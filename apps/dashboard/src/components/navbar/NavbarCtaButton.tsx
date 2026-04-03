'use client';

import { useSession } from '#/hooks/useSession.ts';
import { NavbarLoginButton } from './NavbarLoginButton.tsx';
import { NavbarProfileDropdown } from './profile/NavbarProfileDropdown.tsx';

export function NavbarCtaButton() {
	const { session } = useSession();
	const { error, isLoading, responseData } = session;

	if (isLoading || error || !responseData) {
		return <NavbarLoginButton />;
	}

	const { user } = responseData;

	return <NavbarProfileDropdown user={user} />;
}
