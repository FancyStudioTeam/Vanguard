import './globals.css';
import './tailwind.css';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { GeneralSansVariable } from '#/lib/Fonts.ts';
import { MetadataPage } from '#/lib/Metadata.ts';
import { createMetadataObject } from '#/utils/createMetadataObject.ts';

gsap.registerPlugin(SplitText);

export const metadata: Metadata = createMetadataObject(MetadataPage.Home);

export default function ({ children }: { children: ReactNode }) {
	return (
		<html lang='en-US'>
			<body
				className={`${GeneralSansVariable} my-6 w-full bg-neutral-950 bg-fixed font-general-sans font-medium text-zinc-50`}
			>
				{children}
			</body>
		</html>
	);
}
