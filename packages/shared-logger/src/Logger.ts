// biome-ignore-all lint/style/useNamingConvention: (x)

import * as tslog from 'tslog';

const { BaseLogger } = tslog;

export class Logger<LoggerObject> extends BaseLogger<LoggerObject> {
	public constructor(options?: tslog.ISettingsParam<LoggerObject>, loggerObject?: LoggerObject) {
		super(
			{
				pretty: {
					styles: {
						logLevelName: {
							DEBUG: [
								'bold',
								'magenta',
							],
							ERROR: [
								'bold',
								'redBright',
							],
							FATAL: [
								'bold',
								'red',
							],
							INFO: [
								'bold',
								'cyan',
							],
							TRACE: [
								'bold',
								'white',
							],
							WARN: [
								'bold',
								'yellow',
							],
						},
						name: [
							'white',
							'bold',
						],
					},
					template: '{{dd}}/{{mm}}/{{yyyy}} {{hh}}:{{MM}}:{{ss}}\t{{logLevelName}}\t',
					timeZone: 'UTC',
				},
				stack: {
					capture: 'off',
				},
				type: 'pretty',
				...options,
			},
			loggerObject,
			createEnvironmentProvider(),
			Number.NaN,
			tslog.fullCoreFeatures,
		);
	}

	public debug(...data: unknown[]): void {
		super.log(LoggerLevel.Debug, 'DEBUG', ...data);
	}

	public error(...args: unknown[]): void {
		super.log(LoggerLevel.Error, 'ERROR', ...args);
	}

	public fatal(...args: unknown[]): void {
		super.log(LoggerLevel.Fatal, 'FATAL', ...args);
	}

	public if(condition: unknown): this {
		return super.if(condition);
	}

	public info(...args: unknown[]): void {
		super.log(LoggerLevel.Info, 'INFO', ...args);
	}

	public trace(...data: unknown[]): void {
		super.log(LoggerLevel.Trace, 'TRACE', ...data);
	}

	public warn(...args: unknown[]): void {
		super.log(LoggerLevel.Warn, 'WARN', ...args);
	}
}

function createEnvironmentProvider(): EnvironmentProvider {
	if (hasEnvironmentFunction(tslog, 'createNodeEnvironment')) {
		return tslog.createNodeEnvironment();
	}

	if (hasEnvironmentFunction(tslog, 'createUniversalEnvironment')) {
		return tslog.createUniversalEnvironment();
	}

	throw new TypeError('Cannot Create an Environment Provider for BaseLogger');
}

function hasEnvironmentFunction<
	Object extends Record<PropertyKey, unknown>,
	Key extends PropertyKey,
>(object: Object, key: Key): object is Object & Record<Key, () => EnvironmentProvider> {
	return typeof object[key] === 'function';
}

type EnvironmentProvider = (typeof BaseLogger)['prototype']['runtime'];

enum LoggerLevel {
	Debug = 2,
	Error = 5,
	Fatal = 6,
	Info = 3,
	Trace = 1,
	Warn = 4,
}
