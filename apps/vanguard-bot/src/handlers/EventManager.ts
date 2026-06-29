import type { Dirent } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';

import type { BotEventNames } from '@vanguard/discord-config/inferred-types-bot';
import type { EventListener } from '@vanguard/discord-handlers/events';

import { Collection } from '@discordeno/bot';

import type { Bot } from '#bot/BotTypes.js';
import { logger } from '#lib/Logger.js';
import { isProductionEnvironment } from '#utils/isProductionEnvironment.js';

export class EventManager {
	private readonly bot: Bot;
	private readonly events: Collection<string, EventListenerFunction[]>;

	public constructor(bot: Bot) {
		this.bot = bot;
		this.events = new Collection();
	}

	private static EVENT_FILE_PATTERNS = [
		'**/*.event.{js,jsx,ts,tsx}',
	] as const;

	private createEventFileImportUrl(name: string, parentPath: string): string {
		const eventFilePath = join(parentPath, name);
		const eventFilePathUrl = pathToFileURL(eventFilePath);

		const { href: eventFilePathUrlHref } = eventFilePathUrl;

		return `${eventFilePathUrlHref}?update=${Date.now()}`;
	}

	private createEventsFolderPath(): string {
		return join(cwd(), isProductionEnvironment() ? 'dist' : 'src', 'events');
	}

	private async findEventFiles(): Promise<Dirent[]> {
		const eventsFolderPath = this.createEventsFolderPath();
		const eventFileDirentsIterator = glob(EventManager.EVENT_FILE_PATTERNS, {
			cwd: eventsFolderPath,
			withFileTypes: true,
		});

		const eventFileDirentsArray = await Array.fromAsync(eventFileDirentsIterator);

		return eventFileDirentsArray;
	}

	private async handleEventFileImport(dirent: Dirent): Promise<void> {
		const { name, parentPath } = dirent;

		try {
			const eventFilePathUrlHref = this.createEventFileImportUrl(name, parentPath);
			const eventFileImportData = (await import(eventFilePathUrlHref)) as EventFileImportData;

			const { default: eventListenerData } = eventFileImportData;

			const { data: eventData, run: eventRun } = eventListenerData;
			const { name: eventName } = eventData;

			const eventListeners = this.upsertEventListeners(eventName);

			eventListeners.push(eventRun as never);
		} catch (error) {
			logger.error(error);
		}
	}

	private registerEventsToBot(): void {
		for (const [eventName, eventFunctions] of this.events.entries()) {
			// @ts-expect-error
			this.bot.events[eventName] = (...data) => {
				for (const eventFunction of eventFunctions) {
					eventFunction(...data);
				}
			};
		}
	}

	private upsertEventListeners(
		eventName: string,
		defaultValue: EventListenerFunction[] = [],
	): EventListenerFunction[] {
		const eventListeners = this.events.get(eventName);

		if (eventListeners) {
			return eventListeners;
		}

		this.events.set(eventName, defaultValue);

		return defaultValue;
	}

	public async register(): Promise<void> {
		this.events.clear();

		const eventFiles = await this.findEventFiles();
		const eventFileImportPromises = eventFiles.map((eventFile) =>
			this.handleEventFileImport(eventFile),
		);

		Promise.allSettled(eventFileImportPromises).then(() => this.registerEventsToBot());
	}
}

interface EventFileImportData {
	default: EventListener<BotEventNames>;
}

type EventListenerFunction = (...data: unknown[]) => void;
