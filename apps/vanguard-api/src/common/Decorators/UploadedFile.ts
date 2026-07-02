import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

export const UploadedFile = createParamDecorator((data: string, context: ExecutionContext) => {
	const httpContext = context.switchToHttp();

	const fastifyRequest = httpContext.getRequest<FastifyRequest>();
	const fastifyUploadedFiles = fastifyRequest.uploadedFiles[data] ?? [];

	return fastifyUploadedFiles.length ? fastifyUploadedFiles.at(0) : null;
});
