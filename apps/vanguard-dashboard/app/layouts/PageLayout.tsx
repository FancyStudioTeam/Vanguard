import type { ReactNode } from 'react';

import { Navbar } from '#components/Layout/Navbar/Navbar.tsx';

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<>
			<header className='fixed top-0 h-15 w-full px-6'>
				<Navbar />
			</header>
			{children}
		</>
	);
}

export interface PageLayoutProps {
	children: ReactNode;
}
