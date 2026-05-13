import { defineEventListener } from '@vanguard/discord-handlers/events';

import { InteractionTypes } from '@discordeno/bot';

import { bot } from '#bot/Bot.js';

export default defineEventListener({
	data: {
		name: 'interactionCreate',
	},
	run: async (interaction) => {
		const { data, type } = interaction;

		if (!data) {
			return;
		}

		switch (type) {
			case InteractionTypes.ApplicationCommand: {
				const { commandManager } = bot;

				const command = commandManager.getCommandFromInteraction(interaction);

				if (command) {
					// biome-ignore-start lint/complexity/useLiteralKeys: (x)
					command['setBot'](bot);
					command['setInteraction'](interaction);
					// biome-ignore-end lint/complexity/useLiteralKeys: (x)

					await command.run();
				}

				break;
			}
		}
	},
});
