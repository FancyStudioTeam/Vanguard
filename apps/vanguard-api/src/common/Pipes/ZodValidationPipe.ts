import { Injectable, type PipeTransform } from '@nestjs/common';
import { ZodError, type ZodType } from 'zod';

import { InternalServerErrorException } from '#common/Exceptions/InternalServerErrorException.js';
import { ValidationErrorException } from '#common/Exceptions/ValidationErrorException.js';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	public constructor(private readonly zodSchema: ZodType) {}

	public transform(value: unknown): unknown {
		try {
			return this.zodSchema.parse(value);
		} catch (exception) {
			if (exception instanceof ZodError) {
				const { issues } = exception;
				const { message, path } = issues[0];

				throw new ValidationErrorException(path, message);
			}

			throw new InternalServerErrorException();
		}
	}
}
