import { mixin, type PipeTransform, type Type } from '@nestjs/common';
import { ZodError, type ZodType } from 'zod';

import { InternalServerErrorException } from '#common/Exceptions/InternalServerErrorException.js';
import { ValidationErrorException } from '#common/Exceptions/ValidationErrorException.js';

export function ZodValidationPipe(zodSchema: ZodType): Type<PipeTransform> {
	class MixinPipe implements PipeTransform {
		public transform(value: unknown): unknown {
			try {
				return zodSchema.parse(value);
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

	return mixin(MixinPipe);
}
