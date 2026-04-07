import { verifySession } from '#utils/Session/verifySession.ts';
import { NavbarLoginButton } from './NavbarLoginButton.tsx';
import { NavbarProfileDropdown } from './profile/NavbarProfileDropdown.tsx';

export async function NavbarCtaButton() {
	const session = await verifySession();

	if (!session) {
		return <NavbarLoginButton />;
	}

	const { user } = session;

	return <NavbarProfileDropdown user={user} />;
}
