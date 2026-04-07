import type { Metadata } from 'next';
import { MetadataPage } from '#lib/Metadata.ts';
import { createMetadataObject } from '#utils/Next/createMetadataObject.ts';

export const metadata: Metadata = createMetadataObject(MetadataPage.NotFound);

export default function () {
	return (
		<main className='grid h-100 place-content-center rounded-xl border-2 border-neutral-800 border-dashed'>
			<section className='flex flex-col gap-4 px-6 text-center sm:w-lg'>
				<h1 className='text-balance font-bold text-5xl'>Not Found</h1>
				<p className='text-neutral-400 text-sm'>
					It appears that this page cannot be found or is currently
					unavailable.
				</p>
			</section>
		</main>
	);
}
