import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

import { Navbar } from '#components/Layout/Navbar/Navbar.tsx';

export function PageLayout({ children }: PageLayoutProps) {
	const headerReference = useRef<HTMLElement>(null);

	useGSAP(() => {
		const headerReferenceValue = headerReference.current;

		ScrollTrigger.create({
			start: 10,
			toggleClass: {
				className: 'bg-neutral-950/75',
				targets: headerReferenceValue,
			},
		});
	});

	return (
		<>
			<header
				className='fixed top-0 z-10 w-full items-center backdrop-blur-xl'
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
