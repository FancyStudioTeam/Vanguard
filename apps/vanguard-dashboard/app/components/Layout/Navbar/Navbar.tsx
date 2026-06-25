import { NavbarButtons } from './NavbarButtons.tsx';
import { NavbarCombinationMark } from './NavbarCombinationMark.tsx';

export function Navbar() {
	return (
		<nav className='mx-auto flex h-15 w-full max-w-7xl items-center justify-center px-8 py-4 sm:justify-between'>
			<NavbarCombinationMark />
			<NavbarButtons />
		</nav>
	);
}
