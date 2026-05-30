import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { BadRequestException } from '@nestjs/common';

export class MissingOAuth2CodeException extends BadRequestException {
	public constructor() {
		super({
			code: ErrorCodes.MissingOAuth2Code,
			message: 'Missing Required OAuth2 Authorization Code',
		});
	}
}
