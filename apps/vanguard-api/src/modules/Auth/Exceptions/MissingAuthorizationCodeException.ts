import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { BadRequestException } from '@nestjs/common';

export class MissingAuthorizationCodeException extends BadRequestException {
	public constructor() {
		super({
			code: ErrorCodes.MissingAuthorizationCode,
			message: 'Missing Authorization Code',
		});
	}
}
