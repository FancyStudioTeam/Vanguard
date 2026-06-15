import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { NotFoundException as NotFoundBuiltInException } from '@nestjs/common';

export class NotFoundException extends NotFoundBuiltInException {
	public constructor() {
		super({
			code: ErrorCodes.NotFound,
			message: '404: Not Found',
		});
	}
}
