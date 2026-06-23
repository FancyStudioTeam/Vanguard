import type { ReactNode } from 'react';

import { Navbar } from '#components/Layout/Navbar/Navbar.tsx';

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<>
			<header className='fixed top-0 z-10 h-15 w-full backdrop-blur-xl'>
				<Navbar />
			</header>
			<main>{children}</main>
		</>
	);
}

export interface PageLayoutProps {
	children: ReactNode;
}
