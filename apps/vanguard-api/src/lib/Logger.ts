import { Logger } from 'tslog';

export const logger = new Logger({
	hideLogPositionForProduction: true,
	prettyLogTimeZone: 'UTC',
	type: 'pretty',
});
