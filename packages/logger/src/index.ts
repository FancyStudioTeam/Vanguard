// biome-ignore-all lint/style/useNamingConvention: (x)

import { BaseLogger, type ISettingsParam } from 'tslog';

export class Logger<LoggerObject> extends BaseLogger<LoggerObject> {
	private static MAX_STACK_DEPTH_LEVEL = 5 as const;

	public constructor(options?: ISettingsParam<LoggerObject>, loggerObject?: LoggerObject) {
		super(
			{
				hideLogPositionForProduction: true,
				prettyLogStyles: {
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
				prettyLogTemplate: '{{dd}}/{{mm}}/{{yyyy}} {{hh}}:{{MM}}:{{ss}}\t{{logLevelName}}\t',
				prettyLogTimeZone: 'UTC',
				type: 'pretty',
				...options,
			},
			loggerObject,
			Logger.MAX_STACK_DEPTH_LEVEL,
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

	public trace(...data: unknown[]): void {
		super.log(LoggerLevel.Trace, 'TRACE', ...data);
	}

	public info(...args: unknown[]): void {
		super.log(LoggerLevel.Info, 'INFO', ...args);
	}

	public warn(...args: unknown[]): void {
		super.log(LoggerLevel.Warn, 'WARN', ...args);
	}
}

enum LoggerLevel {
	Debug = 2,
	Error = 5,
	Fatal = 6,
	Info = 3,
	Trace = 1,
	Warn = 4,
}
