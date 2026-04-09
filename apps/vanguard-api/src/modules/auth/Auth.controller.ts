import { Controller, Get, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.js';
// biome-ignore lint/style/useImportType: (x)
import { AuthService } from './Auth.service.js';

@Controller('auth')
export class AuthController {
	// biome-ignore lint/correctness/noUnusedPrivateClassMembers: (x)
	public constructor(private readonly authService: AuthService) {}

	@Get('callback')
	public async handleCallback(@Req() fastifyRequest: CallbackRequest): Promise<unknown> {
		const { authService } = this;

		const { query } = fastifyRequest;
		const { code } = query;

		if (!code) {
			throw MISSING_QUERY_STRING_PARAM_RESPONSE('code');
		}

		const _accessTokenResponse = await authService.exchangeToken(code);

		return 'OK';
	}
}

interface CallbackRequestQueryStringParams {
	code?: string;
}

type CallbackRequest = FastifyRequest<{
	// biome-ignore lint/style/useNamingConvention: (x)
	Querystring: CallbackRequestQueryStringParams;
}>;
