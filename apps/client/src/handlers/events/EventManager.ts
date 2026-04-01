import type { Dirent } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';
import type { Bot, BotEventNames } from '#bot/BotTypes.js';
import type { EventListener } from './EventTypes.js';

const EVENTS_PATTERNS = [
	'**/events/**/*.event.{js,jsx,ts,tsx}',
];

export class EventManager {
	public readonly bot: Bot;

	public constructor(bot: Bot) {
		this.bot = bot;
	}

	private createEventFileImportUrl(name: string, parentPath: string): string {
		const eventFilePath = join(parentPath, name);
		const eventFilePathUrl = pathToFileURL(eventFilePath);

		const { href: eventFilePathUrlHref } = eventFilePathUrl;

		return eventFilePathUrlHref;
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
			const eventFilePathUrlHref = this.createEventFileImportUrl(name, parentPath);
			const eventFileImportData = (await import(eventFilePathUrlHref)) as EventFileImportData;

			const { default: eventListener } = eventFileImportData;

			const { data: eventListenerData, run: eventRun } = eventListener;
			const { name: eventName } = eventListenerData;

			events[eventName] = eventRun;
		}
	}
}

interface EventFileImportData {
	default: EventListener<BotEventNames>;
}
