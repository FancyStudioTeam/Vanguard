import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
	public catch(exception: HttpException, host: ArgumentsHost): void {
		const httpContext = host.switchToHttp();

		const fastifyReply = httpContext.getResponse<FastifyReply>();

		const response = exception.getResponse();
		const status = exception.getStatus();

		fastifyReply.status(status).send(response);
	}
}
