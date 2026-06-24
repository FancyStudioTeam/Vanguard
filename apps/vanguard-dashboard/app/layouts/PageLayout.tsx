import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

import { Navbar } from '#components/Layout/Navbar/Navbar.tsx';

export function PageLayout({ children }: PageLayoutProps) {
	const headerReference = useRef<HTMLElement>(null);

	useGSAP(() => {
		const headerReferenceValue = headerReference.current;

		ScrollTrigger.create({
			onEnter: () => headerReferenceValue?.classList.add('bg-neutral-950'),
			onLeaveBack: () => headerReferenceValue?.classList.remove('bg-neutral-950'),
			start: 10,
		});
	});

	return (
		<>
			<header
				className='fixed top-0 z-10 h-15 w-full'
				ref={headerReference}
			>
				<Navbar />
			</header>
			<main>{children}</main>
		</>
	);
}

export interface PageLayoutProps {
	children: ReactNode;
}
