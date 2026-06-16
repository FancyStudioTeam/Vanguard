import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { BadRequestException } from '@nestjs/common';

export class MissingOAuth2AuthorizationCodeException extends BadRequestException {
	public constructor() {
		super({
			code: ErrorCodes.MissingOAuth2AuthorizationCode,
			message: 'Missing OAuth2 Authorization Code',
		});
	}
}
