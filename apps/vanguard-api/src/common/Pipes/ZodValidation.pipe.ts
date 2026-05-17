import { Injectable, type PipeTransform } from '@nestjs/common';
import { ZodError, type ZodType } from 'zod';

import { INTERNAL_SERVER_ERROR_RESPONSE, ZOD_VALIDATION_ERROR_RESPONSE } from '#lib/Responses/Shared.js';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	public constructor(private readonly zodSchema: ZodType) {}

	public transform(value: unknown): unknown {
		try {
			return this.zodSchema.parse(value);
		} catch (exception) {
			if (exception instanceof ZodError) {
				const { issues } = exception;
				const { message } = issues[0];

				throw ZOD_VALIDATION_ERROR_RESPONSE(message);
			}

			throw INTERNAL_SERVER_ERROR_RESPONSE();
		}
	}
}
