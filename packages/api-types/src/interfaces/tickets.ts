// biome-ignore-all lint/style/useNamingConvention: (x)

export interface APIGuildTicketPanel {
	channelId: string;
	channelParentId: string | null;
	enabled: boolean;
	panelId: string;
	title: string;
	type: unknown;
}

export interface APIGuildTicketsConfiguration {
	enabled: boolean;
	panels: APIGuildTicketPanel[];
}
