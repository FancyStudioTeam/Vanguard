import { LinkBreakIcon } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '#/components/ui/Button.tsx';
import { MetadataPage } from '#/lib/Metadata.ts';
import { createMetadataObject } from '#/utils/createMetadataObject.ts';

export const metadata: Metadata = createMetadataObject(MetadataPage.NotFound);

export default function () {
	return (
		<main className='mx-auto grid h-dvh place-content-center'>
			<section className='flex flex-col gap-4 rounded-md'>
				<span className='mx-auto size-fit rounded-lg border border-neutral-800 p-2'>
					<LinkBreakIcon className='size-10 text-neutral-400' weight='duotone' />
				</span>
				<h1 className='text-center font-bold text-3xl'>Page Not Found</h1>
				<Button asChild={true}>
					<Link href='/'>Return Home</Link>
				</Button>
			</section>
		</main>
	);
}
