import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidFileMimeTypeException extends UnprocessableEntityException {
	public constructor() {
		super({
			code: ErrorCodes.InvalidFileMimeType,
			message: 'Maximum File Mimetype',
		});
	}
}
