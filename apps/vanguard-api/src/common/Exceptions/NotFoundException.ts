import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { NotFoundException as _NotFoundException } from '@nestjs/common';

export class NotFoundException extends _NotFoundException {
	public constructor() {
		super({
			code: ErrorCodes.NotFound,
			message: '404: Not Found',
		});
	}
}
