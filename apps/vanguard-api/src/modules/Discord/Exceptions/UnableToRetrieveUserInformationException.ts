import { ErrorCodes } from '@vanguard/api-contracts/enums';

import { InternalServerErrorException } from '@nestjs/common';

export class UnableToRetrieveUserInformationException extends InternalServerErrorException {
	public constructor() {
		super({
			code: ErrorCodes.UnableToRetrieveUserInformation,
			message: "Unable to Retrieve the User's Information",
		});
	}
}
