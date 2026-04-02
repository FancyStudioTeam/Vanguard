import './globals.css';
import './tailwind.css';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navbar } from '#/components/navbar/Navbar.tsx';
import { GeneralSansVariable } from '#/lib/Fonts.ts';
import { MetadataPage } from '#/lib/Metadata.ts';
import { createMetadataObject } from '#/utils/createMetadataObject.ts';

gsap.registerPlugin(SplitText);

export const metadata: Metadata = createMetadataObject(MetadataPage.Home);

export default function ({ children }: { children: ReactNode }) {
	return (
		<html lang='en-US'>
			<body
				className={`${GeneralSansVariable} mx-auto h-dvh w-full max-w-7xl bg-dark-950 bg-radial from-dark-900 to-dark-950 py-6 font-general-sans font-medium text-dark-50`}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
