import type { ReactNode } from 'react';
import { Navbar } from '#/components/navbar/Navbar.tsx';

export function PageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex flex-col gap-6'>
			<Navbar />
			{children}
		</div>
	);
}
