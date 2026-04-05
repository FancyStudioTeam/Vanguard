import type { Metadata } from 'next';
import {
	METADATA_PAGE_DESCRIPTION,
	METADATA_PAGE_TITLE,
	MetadataPage,
} from '#lib/Metadata.ts';

export function createMetadataObject(page: MetadataPage): Metadata {
	const { description, robots, title } = buildPageInformationData(page);

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

function buildPageInformationData(page: MetadataPage): PageInformationData {
	const description = getPageDescription(page);
	const robots = getPageRobots(page);
	const title = getPageTitle(page);

	return {
		description,
		robots,
		title,
	};
}

function getPageDescription(page: MetadataPage): string {
	return METADATA_PAGE_DESCRIPTION[page];
}

function getPageRobots(page: MetadataPage): string {
	if (page === MetadataPage.NotFound) {
		return 'noindex, follow';
	}

	return 'index, follow';
}

function getPageTitle(page: MetadataPage): string {
	return METADATA_PAGE_TITLE[page];
}

interface PageInformationData {
	description: string;
	robots: string;
	title: string;
}
