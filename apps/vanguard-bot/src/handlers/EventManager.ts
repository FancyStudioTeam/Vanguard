import type { Dirent } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';

import type { BotEventNames } from '@vanguard/discord-config/inferred-types';
import type { EventListener } from '@vanguard/discord-handlers/events';

import { Collection } from '@discordeno/bot';

import type { Bot } from '#bot/BotTypes.js';
import { isProductionEnvironment } from '#utils/isProductionEnvironment.js';

const EVENTS_PATTERNS = [
	'**/*.event.{js,jsx,ts,tsx}',
];

export class EventManager {
	private readonly bot: Bot;
	private readonly events: Collection<string, EventListenerFunction[]>;

	public constructor(bot: Bot) {
		this.bot = bot;
		this.events = new Collection();
	}

	private createEventFileImportUrl(name: string, parentPath: string): string {
		const eventFilePath = join(parentPath, name);
		const eventFilePathUrl = pathToFileURL(eventFilePath);

		const { href: eventFilePathUrlHref } = eventFilePathUrl;

		return `${eventFilePathUrlHref}?update=${Date.now()}`;
	}

	private async findEventFiles(): Promise<Dirent[]> {
		const eventsFolderPath = this.createEventsFolderPath();

		const eventFileDirentsIterator = glob(EVENTS_PATTERNS, {
			cwd: eventsFolderPath,
			withFileTypes: true,
		});
		const eventFileDirentsArray = await Array.fromAsync(eventFileDirentsIterator);

		return eventFileDirentsArray;
	}

	private createEventsFolderPath(): string {
		const root = isProductionEnvironment() ? 'dist' : 'src';

		return join(cwd(), root, 'events');
	}

	private async handleEventFileImport(dirent: Dirent): Promise<void> {
		const { name, parentPath } = dirent;

		const eventFilePathUrlHref = this.createEventFileImportUrl(name, parentPath);
		const eventFileImportData = (await import(eventFilePathUrlHref)) as EventFileImportData;

		const { default: eventListener } = eventFileImportData;

		const { data: eventData, run: eventRun } = eventListener;
		const { name: eventName } = eventData;

		const eventListeners = this.upsertEventListeners(eventName);

		eventListeners.push(eventRun as never);
	}

	private registerEventsToBot(): void {
		const { events } = this.bot;

		for (const [eventName, eventFunctions] of this.events.entries()) {
			// @ts-expect-error
			events[eventName] = (...data) => {
				for (const eventFunction of eventFunctions) {
					eventFunction(...data);
				}
			};
		}
	}

	private upsertEventListeners(eventName: string): EventListenerFunction[] {
		const existingEventListeners = this.events.get(eventName);

		if (existingEventListeners) {
			return existingEventListeners;
		}

		const defaultValue: EventListenerFunction[] = [];

		this.events.set(eventName, defaultValue);

		return defaultValue;
	}

	public async register(): Promise<void> {
		this.events.clear();

		const eventFiles = await this.findEventFiles();
		const eventFileImportPromises = eventFiles.map((eventFile) => this.handleEventFileImport(eventFile));

		Promise.allSettled(eventFileImportPromises).then(() => this.registerEventsToBot());
	}
}

interface EventFileImportData {
	default: EventListener<BotEventNames>;
}

// biome-ignore lint/suspicious/noExplicitAny: (x)
type EventListenerFunction = (...data: any[]) => any;
