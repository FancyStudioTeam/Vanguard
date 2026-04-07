import './globals.css';
import './tailwind.css';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navbar } from '#components/layout/navbar/Navbar.tsx';
import { GeneralSansVariable } from '#lib/Fonts.ts';
import { MetadataPage } from '#lib/Metadata.ts';
import { createMetadataObject } from '#utils/Next/createMetadataObject.ts';

gsap.registerPlugin(SplitText);

export const metadata: Metadata = createMetadataObject(MetadataPage.Home);

export default function ({ children }: MainLayoutProps) {
	return (
		<html lang='en-US'>
			<body
				className={`${GeneralSansVariable} w-full bg-neutral-950 font-general-sans font-medium text-zinc-50`}
			>
				<div className='mx-auto my-6 flex w-full max-w-7xl flex-col gap-6 px-6'>
					<Navbar />
					{children}
				</div>
			</body>
		</html>
	);
}

interface MainLayoutProps {
	children: ReactNode;
}
