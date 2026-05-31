import type { PipeTransform } from '@nestjs/common';

import { MissingOAuth2CodeException } from '../Exceptions/MissingOAuth2CodeException.js';

export class RequiredOAuth2CodePipe implements PipeTransform {
	public transform(value: unknown) {
		if (typeof value !== 'string' || !value.length) {
			throw new MissingOAuth2CodeException();
		}

		return value;
	}
}
