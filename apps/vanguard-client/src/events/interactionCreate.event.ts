/*import { InteractionTypes } from '@discordeno/bot';
import { defineEventListener } from 'ddenox/handlers';
import { bot } from '#bot/Bot.js';

export default defineEventListener({
	data: {
		name: 'interactionCreate',
	},
	run(interaction) {
		const { data, type } = interaction;

		if (!data) {
			return;
		}

		switch (type) {
			case InteractionTypes.ApplicationCommand: {
				const { commandManager } = bot;
				const { commands } = commandManager;

				const { type, name } = data;

				const commandKey = `${type}.${name}`;

				const command = commands.get(commandKey);

				if (command) {
					command['setBot'](bot);
					command['setInteraction'](interaction);

					command.run();
				}

				break;
			}
		}
	},
});*/
