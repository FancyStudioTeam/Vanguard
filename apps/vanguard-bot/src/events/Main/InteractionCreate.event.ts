/*
 * biome-ignore-all lint/complexity/useLiteralKeys: Private members can only
 * be accessed through computed properties.
 */

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
					command['setBot'](bot);
					command['setInteraction'](interaction);

					await command.run();
				}

				break;
			}
		}
	},
});
