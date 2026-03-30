import 'server-only';
import type { Metadata } from 'next';
import { METADATA_PAGE_DESCRIPTION, METADATA_PAGE_TITLE, MetadataPage } from '#/lib/Metadata.ts';

export function createMetadataObject(page: MetadataPage): Metadata {
	const description = METADATA_PAGE_DESCRIPTION[page];
	const title = METADATA_PAGE_TITLE[page];

	const robots = page === MetadataPage.NotFound ? 'noindex, follow' : 'index, follow';

	return {
		description,
		keywords: [
			'FancyStudio',
			'Discord',
			'Vanguard',
		],
		openGraph: {
			countryName: 'Spain',
			description,
			locale: 'en_US',
			siteName: 'Vanguard',
			title: `${title} - Vanguard`,
			type: 'website',
		},
		robots,
		title: `${title} - Vanguard`,
		twitter: {
			description,
			title: `${title} - Vanguard`,
		},
	};
}
