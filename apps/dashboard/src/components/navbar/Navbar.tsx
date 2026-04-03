import { NavbarCtaButton } from './NavbarCtaButton.tsx';
import { NavbarLogo } from './NavbarLogo.tsx';

export function Navbar() {
	return (
		<nav className='sticky top-6 flex items-center justify-between rounded-xl border-2 border-neutral-800 bg-neutral-900 px-6 py-2'>
			<NavbarLogo />
			<NavbarCtaButton />
		</nav>
	);
}
