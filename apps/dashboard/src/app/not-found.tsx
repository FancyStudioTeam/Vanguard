import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '#/components/ui/Button.tsx';
import { PageLayout } from '#/layouts/PageLayout.tsx';
import { MetadataPage } from '#/lib/Metadata.ts';
import { createMetadataObject } from '#/utils/createMetadataObject.ts';

export const metadata: Metadata = createMetadataObject(MetadataPage.NotFound);

export default function () {
	return (
		<PageLayout>
			<section className='grid h-100 place-content-center gap-4 rounded-xl border-2 border-neutral-800 bg-neutral-900'>
				<h1 className='font-bold text-5xl'>Not Found</h1>
				<Button asChild={true}>
					<Link href='/'>Return Home</Link>
				</Button>
			</section>
		</PageLayout>
	);
}
