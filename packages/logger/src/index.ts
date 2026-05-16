import { BaseLogger, type ISettingsParam } from 'tslog';

export class Logger<LoggerObject> extends BaseLogger<LoggerObject> {
	private static MAX_STACK_DEPTH_LEVEL = 5 as const;

	public constructor(options?: ISettingsParam<LoggerObject>, loggerObject?: LoggerObject) {
		super(
			{
				hideLogPositionForProduction: true,
				prettyLogTimeZone: 'UTC',
				type: 'pretty',
				...options,
			},
			loggerObject,
			Logger.MAX_STACK_DEPTH_LEVEL,
		);
	}
}
