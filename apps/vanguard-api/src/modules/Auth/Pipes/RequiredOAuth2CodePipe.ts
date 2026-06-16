import type { PipeTransform } from '@nestjs/common';

import { MissingOAuth2AuthorizationCodeException } from '../Exceptions/MissingOAuth2AuthorizationCodeException.js';

export class RequiredOAuth2CodePipe implements PipeTransform {
	public transform(value: unknown): string {
		if (typeof value !== 'string' || !value.length) {
			throw new MissingOAuth2AuthorizationCodeException();
		}

		return value;
	}
}
