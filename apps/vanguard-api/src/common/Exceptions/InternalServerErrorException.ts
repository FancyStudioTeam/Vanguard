import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { InternalServerErrorException as InternalServerErrorBuiltInException } from '@nestjs/common';

export class InternalServerErrorException extends InternalServerErrorBuiltInException {
	public constructor() {
		super({
			code: ErrorCodes.InternalServerError,
			message: '500: Internal Server Error',
		});
	}
}
