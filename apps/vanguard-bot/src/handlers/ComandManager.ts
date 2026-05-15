import type { Dirent } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';

import type { Interaction } from '@vanguard/discord-config/inferred-types';
import type { ChatInputHandler, MessageContextHandler, UserContextHandler } from '@vanguard/discord-handlers/commands';
import type { DeclarableCommandConstructor } from '@vanguard/discord-handlers/decorators';

import { type ApplicationCommandTypes, Collection, type CreateApplicationCommand } from '@discordeno/bot';

import type { Bot } from '#bot/BotTypes.js';
import { isProductionEnvironment } from '#utils/isProductionEnvironment.js';

export class CommandManager {
	private readonly applicationCommands: CreateApplicationCommand[];
	private readonly bot: Bot;
	private readonly commands: Collection<CommandsCollectionKey, CommandsCollectionValue>;

	public constructor(bot: Bot) {
		this.applicationCommands = [];
		this.bot = bot;
		this.commands = new Collection();
	}

	private static COMMAND_FILE_PATTERNS = [
		'**/*.command.{js,jsx,ts,tsx}',
	] as const;

	private static getCommandsCollectionKey(interaction: Interaction): CommandsCollectionKey {
		const { data } = interaction;
		const { name, type } = data ?? {};

		if (!(name && type)) {
			throw new TypeError('Cannot retreive the interaction command name and type');
		}

		return `name:${name}/type:${type}`;
	}

	private createCommandFileImportUrl(name: string, parentPath: string): string {
		const commandFilePath = join(parentPath, name);
		const commandFilePathUrl = pathToFileURL(commandFilePath);

		const { href: commandFilePathUrlHref } = commandFilePathUrl;

		return `${commandFilePathUrlHref}?update=${Date.now()}`;
	}

	private createCommandsFolderPath(): string {
		return join(cwd(), isProductionEnvironment() ? 'dist' : 'src', 'commands');
	}

	private async findCommandFiles(): Promise<Dirent[]> {
		const commandsFolderPath = this.createCommandsFolderPath();
		const commandFileDirentsIterator = glob(CommandManager.COMMAND_FILE_PATTERNS, {
			cwd: commandsFolderPath,
			withFileTypes: true,
		});

		const commandFileDirentsArray = await Array.fromAsync(commandFileDirentsIterator);

		return commandFileDirentsArray;
	}

	private getCommandHandlerOptions(declarableCommandHandler: DeclarableCommandHandler): CreateApplicationCommand {
		const type = declarableCommandHandler.getApplicationCommandType();
		const options = declarableCommandHandler.getApplicationCommandOptions();

		const { commands } = this;
		const { name } = options;

		commands.set(`name:${name}/type:${type}`, declarableCommandHandler);

		return options;
	}

	private async handleCommandFileImport(dirent: Dirent): Promise<void> {
		const { name, parentPath } = dirent;

		const commandFilePathUrlHref = this.createCommandFileImportUrl(name, parentPath);
		const commandFileImportData = (await import(commandFilePathUrlHref)) as CommandFileImportData;

		const { default: CommandHandlerConstructor } = commandFileImportData;

		const commandHandler = new CommandHandlerConstructor();
		const commandHandlerOptions = this.getCommandHandlerOptions(commandHandler);

		this.applicationCommands.push(commandHandlerOptions);
	}

	private async registerCommandsToBot(): Promise<void> {
		await this.bot.helpers.upsertGlobalApplicationCommands(this.applicationCommands);
	}

	public getCommandFromInteraction(interaction: Interaction): CommandsCollectionValue | undefined {
		const commandsCollectionKey = CommandManager.getCommandsCollectionKey(interaction);
		const commandHandler = this.commands.get(commandsCollectionKey);

		return commandHandler;
	}

	public async register(): Promise<void> {
		this.commands.clear();

		const commandFiles = await this.findCommandFiles();
		const commandFileImportPromises = commandFiles.map((commandFile) => this.handleCommandFileImport(commandFile));

		Promise.allSettled(commandFileImportPromises).then(async () => await this.registerCommandsToBot());
	}
}

interface CommandFileImportData {
	default: DeclarableCommandConstructor;
}

type CommandsCollectionKey = `name:${string}/type:${ApplicationCommandTypes}`;
type CommandsCollectionValue = DeclarableCommandHandler;

type DeclarableCommandHandler = ChatInputHandler | MessageContextHandler | UserContextHandler;
