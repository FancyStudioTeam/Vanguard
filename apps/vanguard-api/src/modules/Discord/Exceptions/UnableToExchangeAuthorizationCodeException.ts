import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { InternalServerErrorException } from '@nestjs/common';

export class UnableToExchangeAuthorizationCodeException extends InternalServerErrorException {
	public constructor() {
		super({
			code: ErrorCodes.UnableToExchangeAuthorizationCode,
			message: 'Unable to Exchange the Authorization Code',
		});
	}
}
