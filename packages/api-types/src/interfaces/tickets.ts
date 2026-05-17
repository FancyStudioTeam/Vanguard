// biome-ignore-all lint/style/useNamingConvention: (x)

export interface APITicketPanel {
	channelId: string;
	channelParentId: string | null;
	enabled: boolean;
	panelId: string;
	title: string;
	type: unknown;
}

export interface APITicketsConfiguration {
	enabled: boolean;
	panels: APITicketPanel[];
}
