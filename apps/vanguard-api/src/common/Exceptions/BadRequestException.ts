import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { BadRequestException as _BadRequestException } from '@nestjs/common';

export class BadRequestException extends _BadRequestException {
	public constructor() {
		super({
			code: ErrorCodes.BadRequest,
			message: '400: Bad Request',
		});
	}
}
