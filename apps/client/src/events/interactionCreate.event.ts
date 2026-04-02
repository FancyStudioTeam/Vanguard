/* biome-ignore-all lint/complexity/useLiteralKeys: (x) */

import { ApplicationCommandTypes } from '@discordeno/bot';
import { defineEventListener } from 'ddenox/handlers';
import { bot } from '#bot/Bot.js';

export default defineEventListener({
	data: {
		name: 'interactionCreate',
	},
	run: async (interaction) => {
		console.log(interaction);
		const { data } = interaction;

		if (!data) {
			return;
		}

		const { commands } = bot;
		const { type, name } = data;

		switch (type) {
			case ApplicationCommandTypes.ChatInput: {
				const { chatInput } = commands;
				const command = chatInput.get(name);

				if (command) {
					command['setBot'](bot);
					command['setInteraction'](interaction);

					await command.run();
				}

				break;
			}
			case ApplicationCommandTypes.User: {
				const { userContext } = commands;
				const command = userContext.get(name);

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
