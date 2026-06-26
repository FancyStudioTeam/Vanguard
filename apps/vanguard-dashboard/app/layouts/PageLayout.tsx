import type { ReactNode } from 'react';

import { Footer } from '#components/Layout/Footer/Footer.tsx';
import { Navbar } from '#components/Layout/Navbar/Navbar.tsx';

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}

export interface PageLayoutProps {
	children: ReactNode;
}
