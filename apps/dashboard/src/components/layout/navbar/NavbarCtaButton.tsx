import { verifySession } from '#utils/Session/verifySession.ts';
import { NavbarLoginButton } from './NavbarLoginButton.tsx';
import { NavbarProfileDropdown } from './profile/NavbarProfileDropdown.tsx';

export async function NavbarCtaButton() {
	const user = await verifySession();

	if (!user) {
		return <NavbarLoginButton />;
	}

	return <NavbarProfileDropdown user={user} />;
}
