/*
 * biome-ignore-all lint/complexity/useLiteralKeys: Private members can only
 * be accessed through computed properties.
 */

import { defineEventListener } from '@vanguard/discord-handlers/events';

import {
	BitwisePermissionFlags,
	ChannelTypes,
	InteractionResponseTypes,
	InteractionTypes,
	MessageComponentTypes,
	MessageFlags,
	OverwriteTypes,
} from '@discordeno/bot';

import { bot } from '#bot/Bot.js';
import { prisma } from '#lib/Prisma.js';

export default defineEventListener({
	data: {
		name: 'interactionCreate',
	},
	run: async (interaction) => {
		const {
			data: interactionData,
			guildId: interactionGuildId,
			id: interactionId,
			token: interactionToken,
			type: interactionType,
			user: interactionUser,
		} = interaction;

		if (!(interactionData && interactionGuildId)) {
			return;
		}

		switch (interactionType) {
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
			case InteractionTypes.MessageComponent: {
				const { customId } = interactionData;

				if (!customId) {
					return;
				}

				if (customId.startsWith('ticket_panel')) {
					const [_, panelId] = customId.split(':');

					const ticketPanel = await prisma.guildTicketPanel.findUnique({
						where: {
							guildId: String(interactionGuildId),
							panelId,
						},
					});

					if (!ticketPanel?.enabled) {
						return;
					}

					const { id: interactionUserId, username: interactionUserUsername } =
						interactionUser;

					const channelCreated = await bot.helpers.createChannel(interactionGuildId, {
						name: `${interactionUserUsername}-ticket`,
						permissionOverwrites: [
							{
								deny: BigInt(
									BitwisePermissionFlags.SEND_MESSAGES |
										BitwisePermissionFlags.VIEW_CHANNEL,
								),
								id: interactionGuildId,
								type: OverwriteTypes.Role,
							},
							{
								allow: BigInt(
									BitwisePermissionFlags.SEND_MESSAGES |
										BitwisePermissionFlags.VIEW_CHANNEL,
								),
								id: interactionUserId,
								type: OverwriteTypes.Member,
							},
						],
						type: ChannelTypes.GuildText,
					});
					const channelCreatedId = channelCreated.id;

					await bot.helpers.sendMessage(channelCreatedId, {
						components: [
							{
								components: [
									{
										content: `**Welcome to your ticket! <@${String(interactionUserId)}>**`,
										type: MessageComponentTypes.TextDisplay,
									},
								],
								type: MessageComponentTypes.Container,
							},
						],
						flags: MessageFlags.IsComponentsV2,
					});

					await bot.helpers.sendInteractionResponse(interactionId, interactionToken, {
						data: {
							content: `Your ticket was created at <#${channelCreatedId}>`,
							flags: MessageFlags.Ephemeral,
						},
						type: InteractionResponseTypes.ChannelMessageWithSource,
					});
				}

				break;
			}
		}
	},
});
