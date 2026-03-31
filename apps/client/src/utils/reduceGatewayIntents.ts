import type { GatewayIntents } from '@discordeno/bot';

export function reduceGatewayIntents(...gatewayIntents: GatewayIntents[]): GatewayIntents {
	return Number(gatewayIntents.reduce((previous, intent) => previous | intent, 0));
}
