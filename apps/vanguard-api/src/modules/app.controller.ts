import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

@Controller()
export class AppController {
	@Get()
	handleIndex(@Res() fastifyReply: FastifyReply): FastifyReply {
		return fastifyReply.status(HttpStatus.OK).send({
			now: Date.now(),
		});
	}
}
