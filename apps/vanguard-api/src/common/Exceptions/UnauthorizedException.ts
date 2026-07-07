import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { UnauthorizedException as _UnauthorizedException } from '@nestjs/common';

export class UnauthorizedException extends _UnauthorizedException {
	public constructor() {
		super({
			code: ErrorCodes.Unauthorized,
			message: '401: Unauthorized',
		});
	}
}
