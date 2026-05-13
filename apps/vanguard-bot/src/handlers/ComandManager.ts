import type { Dirent } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';

import type { MessageContextHandler, UserContextHandler } from '@vanguard/discord-handlers/commands';
import type { DeclarableCommandConstructor } from '@vanguard/discord-handlers/decorators';

import { type ApplicationCommandTypes, Collection, type CreateApplicationCommand, type InteractionData } from '@discordeno/bot';

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

	public static getCommandsCollectionKey(interactionData: InteractionData): CommandsCollectionKey {
		const { name, type } = interactionData;

		if (!type) {
			throw new TypeError('Cannot retreive the interaction command type');
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
		const root = isProductionEnvironment() ? 'dist' : 'src';

		return join(cwd(), root, 'commands');
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
		const options = declarableCommandHandler.toOptions();

		const { type } = declarableCommandHandler;

		const { commands } = this;
		const { name } = options;

		commands.set(`name:${name}/type:${type}`, declarableCommandHandler);

		return options;
	}

	private async handleCommandFileImport({ name, parentPath }: Dirent): Promise<void> {
		const { applicationCommands } = this;

		const commandFilePathUrlHref = this.createCommandFileImportUrl(name, parentPath);
		const commandFileImportData = (await import(commandFilePathUrlHref)) as CommandFileImportData;

		const { default: CommandHandlerConstructor } = commandFileImportData;

		const commandHandler = new CommandHandlerConstructor();
		const commandHandlerOptions = this.getCommandHandlerOptions(commandHandler);

		applicationCommands.push(commandHandlerOptions);
	}

	private async registerCommandsToBot(): Promise<void> {
		const { helpers } = this.bot;

		await helpers.upsertGlobalApplicationCommands(this.applicationCommands);
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

type DeclarableCommandHandler = MessageContextHandler | UserContextHandler;
