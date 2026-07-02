import type { MultipartFile } from '@fastify/multipart';
import {
	type CallHandler,
	type ExecutionContext,
	mixin,
	type NestInterceptor,
	type Type,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import type { Observable } from 'rxjs';

import { InvalidFileMimeTypeException } from '#common/Exceptions/InvalidFileMimeTypeException.js';
import { MaximumFileSizeExceededException } from '#common/Exceptions/MaximumFileSizeExceededException.js';

export function FileInterceptor(options: FileInterceptorOptions): Type<NestInterceptor> {
	const {
		allowedMimeTypes = 'all',
		fieldNames,
		maximumFileSize = Infinity,
		maximumFilesLength = 5,
	} = options;

	class MixinInterceptor implements NestInterceptor {
		private static CONVERSION_FACTOR = 1_024 as const;

		public async intercept(
			context: ExecutionContext,
			next: CallHandler,
		): Promise<Observable<unknown>> {
			const httpContext = context.switchToHttp();

			const fastifyRequest = httpContext.getRequest<FastifyRequest>();
			const fastifyRequestParts = fastifyRequest.parts();

			const fastifyBody: Record<string, unknown> = {};
			const fastifyUploadedFiles: Record<string, MultipartFile[]> = {};

			let processedFilesCount = 0;

			for await (const part of fastifyRequestParts) {
				const {
					fieldname: partFieldName,
					mimetype: partMimeType,
					type: partFieldType,
				} = part;

				const fileNameLowerCased = partFieldName.toLowerCase();

				if (fieldNames.includes(fileNameLowerCased) && partFieldType !== 'file') {
					continue;
				}

				if (partFieldType === 'file') {
					if (processedFilesCount >= maximumFilesLength) {
						break;
					}

					const fileBuffer = await part.toBuffer();
					const fileBufferBytesLength = fileBuffer.byteLength;

					if (fileBufferBytesLength > this.megaBytesToBytes(maximumFileSize)) {
						throw new MaximumFileSizeExceededException();
					}

					if (allowedMimeTypes !== 'all' && !allowedMimeTypes.includes(partMimeType)) {
						throw new InvalidFileMimeTypeException();
					}

					fastifyUploadedFiles[fileNameLowerCased] ??= [];
					fastifyUploadedFiles[fileNameLowerCased].push(part);

					++processedFilesCount;
				} else {
					fastifyBody[partFieldName] = part.value || null;
				}
			}

			fastifyRequest.body = fastifyBody;
			fastifyRequest.uploadedFiles = fastifyUploadedFiles;

			return next.handle();
		}

		private megaBytesToBytes(megaBytes: number): number {
			return megaBytes ** (MixinInterceptor.CONVERSION_FACTOR ** 2);
		}
	}

	return mixin(MixinInterceptor);
}

interface FileInterceptorOptions {
	allowedMimeTypes?: 'all' | string[];
	fieldNames: string[];
	maximumFileSize?: number;
	maximumFilesLength?: number;
}
