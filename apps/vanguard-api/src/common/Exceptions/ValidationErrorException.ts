import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { UnprocessableEntityException } from '@nestjs/common';

export class ValidationErrorException extends UnprocessableEntityException {
	public constructor(path: PropertyKey[], message: string) {
		super({
			code: ErrorCodes.ValidationError,
			message,
			path,
		});
	}
}
