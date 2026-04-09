import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import type { FastifyReply } from 'fastify/types/reply.js';
import type { FastifyRequest } from 'fastify/types/request.js';
// biome-ignore lint/suspicious/noDeprecatedImports: (x)
import { type Observable, tap } from 'rxjs';
import { logger } from '#lib/Logger.js';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		return next.handle().pipe(
			tap({
				next: () => {
					const httpContext = context.switchToHttp();

					const { method, ip, url } = httpContext.getRequest<FastifyRequest>();
					const { statusCode } = httpContext.getResponse<FastifyReply>();

					logger.info(`[${method}] '${url}' - '${ip}' [${statusCode}]`);
				},
			}),
		);
	}
}
