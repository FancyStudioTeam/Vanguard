import 'server-only';

export enum MetadataPage {
	Home = 'HOME',
	NotFound = 'NOT_FOUND',
}

export const METADATA_PAGE_TITLE: Record<MetadataPage, string> = {
	[MetadataPage.Home]: 'Home',
	[MetadataPage.NotFound]: 'Not Found',
};

export const METADATA_PAGE_DESCRIPTION: Record<MetadataPage, string> = {
	[MetadataPage.Home]: 'Welcome to the official Vanguard website.',
	[MetadataPage.NotFound]:
		'This page was not found or is currently unavailable.',
};
