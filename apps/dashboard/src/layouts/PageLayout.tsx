import type { ReactNode } from 'react';
import { Navbar } from '#components/layout/navbar/Navbar.tsx';

export function PageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='mx-auto my-6 flex w-full max-w-7xl flex-col gap-6 px-6'>
			<Navbar />
			{children}
		</div>
	);
}
