import type { Dirent } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path/win32';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';
import type { CreateApplicationCommand } from '@discordeno/bot';
import type { Bot } from '#bot/BotTypes.js';
import type { DeclarableCommandConstructor } from '#handlers/decorators/DeclareTypes.js';
import { ChatInputCommandHandler } from './structures/ChatInputCommandHandler.js';

const COMMANDS_PATTERNS = [
	'**/commands/**/*.command.{js,ts}',
];

export class CommandManager {
	public readonly bot: Bot;

	public constructor(bot: Bot) {
		this.bot = bot;
	}

	private createCommandFileImportUrl(name: string, parentPath: string): string {
		const commandFilePath = join(parentPath, name);
		const commandFilePathUrl = pathToFileURL(commandFilePath);

		const { href: commandFilePathUrlHref } = commandFilePathUrl;

		return commandFilePathUrlHref;
	}

	private async findCommandFiles(): Promise<Dirent[]> {
		const commandFileDirentsIterator = glob(COMMANDS_PATTERNS, {
			cwd: cwd(),
			withFileTypes: true,
		});

		return await Array.fromAsync(commandFileDirentsIterator);
	}

	private getCommandHandlerOptions(
		commandInstance: ChatInputCommandHandler,
	): CreateApplicationCommand {
		const { bot } = this;

		switch (true) {
			case commandInstance instanceof ChatInputCommandHandler: {
				return this.handleChatInputCommandHandler(bot, commandInstance);
			}
			default: {
				throw new Error(`Command instance '${commandInstance}' is not handled`);
			}
		}
	}

	private handleChatInputCommandHandler(
		bot: Bot,
		chatInputCommandHandler: ChatInputCommandHandler,
	): CreateApplicationCommand {
		const { commands } = bot;
		const { chatInput } = commands;

		const options = chatInputCommandHandler.toOptions();

		const { name } = options;

		chatInput.set(name, chatInputCommandHandler);

		return options;
	}

	public async initialize(): Promise<void> {
		const applicationCommands: CreateApplicationCommand[] = [];

		const { bot } = this;
		const { helpers } = bot;

		const commandFiles = await this.findCommandFiles();

		for (const { name, parentPath } of commandFiles) {
			const commandFilePathUrlHref = this.createCommandFileImportUrl(name, parentPath);
			const commandFileImportData = (await import(
				commandFilePathUrlHref
			)) as CommandFileImportData;

			const { default: CommandConstructor } = commandFileImportData;

			const commandInstance = new CommandConstructor();
			const commandOptions = this.getCommandHandlerOptions(commandInstance);

			applicationCommands.push(commandOptions);
		}

		await helpers.upsertGlobalApplicationCommands(applicationCommands);
	}
}

interface CommandFileImportData {
	default: DeclarableCommandConstructor;
}
