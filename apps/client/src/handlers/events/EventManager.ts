import type { Dirent } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';
import type { Bot, BotEventNames } from '#bot/BotTypes.js';
import type { EventConfig, EventHandler } from './EventTypes.js';

const EVENTS_PATTERNS = [
	'**/events/**/*.event.{js,ts}',
];

export class EventManager {
	public readonly bot: Bot;

	public constructor(bot: Bot) {
		this.bot = bot;
	}

	private async findEventFiles(): Promise<Dirent[]> {
		const eventFileDirentsIterator = glob(EVENTS_PATTERNS, {
			cwd: cwd(),
			withFileTypes: true,
		});

		return await Array.fromAsync(eventFileDirentsIterator);
	}

	public async initialize(): Promise<void> {
		const { bot } = this;
		const { events } = bot;

		const eventFiles = await this.findEventFiles();

		for (const { name, parentPath } of eventFiles) {
			const eventFilePath = join(parentPath, name);
			const eventFilePathUrl = pathToFileURL(eventFilePath);

			const { config: eventConfig, handler: eventHandler } = (await import(
				eventFilePathUrl.href
			)) as EventFileImportData;
			const { name: eventName } = eventConfig;

			Object.defineProperty(events, eventName, {
				configurable: false,
				enumerable: false,
				value: eventHandler,
				writable: false,
			});
		}
	}
}

interface EventFileImportData {
	config: EventConfig<BotEventNames>;
	handler: EventHandler<EventConfig<BotEventNames>>;
}
