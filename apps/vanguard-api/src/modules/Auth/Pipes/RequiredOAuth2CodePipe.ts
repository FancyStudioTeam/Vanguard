import type { PipeTransform } from '@nestjs/common';

import { MissingAuthorizationCodeException } from '../Exceptions/MissingAuthorizationCodeException.js';

export class RequiredOAuth2CodePipe implements PipeTransform {
	public transform(value: unknown): string {
		if (typeof value !== 'string' || !value.length) {
			throw new MissingAuthorizationCodeException();
		}

		return value;
	}
}
