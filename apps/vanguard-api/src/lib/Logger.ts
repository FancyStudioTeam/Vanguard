import { Logger } from 'tslog';

export const logger = new Logger({
	prettyLogTimeZone: 'UTC',
	type: 'pretty',
});
