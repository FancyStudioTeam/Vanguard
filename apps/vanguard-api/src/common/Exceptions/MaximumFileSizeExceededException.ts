import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { UnprocessableEntityException } from '@nestjs/common';

export class MaximumFileSizeExceededException extends UnprocessableEntityException {
	public constructor() {
		super({
			code: ErrorCodes.MaximumFileSizeExceeded,
			message: 'Maximum File Size Exceeded',
		});
	}
}
