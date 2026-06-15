import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { InternalServerErrorException as _InternalServerErrorException } from '@nestjs/common';

export class InternalServerErrorException extends _InternalServerErrorException {
	public constructor() {
		super({
			code: ErrorCodes.InternalServerError,
			message: '500: Internal Server Error',
		});
	}
}
