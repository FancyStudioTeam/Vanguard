import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { ForbiddenException as _ForbiddenException } from '@nestjs/common';
export class ForbiddenException extends _ForbiddenException {
	public constructor() {
		super({
			code: ErrorCodes.Forbidden,
			message: '403: Forbidden',
		});
	}
}
