import type { RESTGetAPIGuild } from '@vanguard/api-contracts/rest';

import type { MultipartFile } from '@fastify/multipart';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Param,
	Put,
	Redirect,
	UseInterceptors,
} from '@nestjs/common';

import { BypassAuth } from '#common/Decorators/BypassAuth.js';
import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { UploadedFile } from '#common/Decorators/UploadedFile.js';
import { FileInterceptor } from '#common/Interceptors/FileInterceptor.js';
import { ZodValidationPipe } from '#common/Pipes/ZodValidationPipe.js';
import { createGuildInviteUrl } from '#utils/URL/createGuildInviteUrl.js';
import { GuildService } from './Guild.service.js';
import {
	UpdateBotProfileSchema,
	type UpdateBotProfileSchemaDto,
} from './Schemas/BotProfileSchema.js';

@Controller()
export class GuildController {
	public constructor(@Inject(GuildService) private readonly guildService: GuildService) {}

	private static CONVERSION_FACTOR = 1_024 as const;
	private static MAXIMUM_FILE_SIZE_MEGA_BYTES = 5 as const;

	@Get()
	@HttpCode(HttpStatus.OK)
	protected async getGuild(@Param('guildId') guildId: string): Promise<RESTGetAPIGuild> {
		return await this.guildService.getGuild(guildId);
	}

	@Get('invite')
	@Redirect()

	@BypassAuth()
	@BypassGuildPermissions()
	protected redirectToGuildInvite(@Param('guildId') guildId: string): Record<string, unknown> {
		return {
			statusCode: HttpStatus.FOUND,
			url: createGuildInviteUrl(guildId),
		};
	}

	@Put('bot-profile')
	@HttpCode(HttpStatus.NO_CONTENT)

	@UseInterceptors(
		FileInterceptor({
			allowedMimeTypes: [
				'image/jpeg',
				'image/gif',
				'image/png',
			],
			fieldNames: [
				'avatar',
				'banner',
			],
			maximumFileSize:
				GuildController.MAXIMUM_FILE_SIZE_MEGA_BYTES *
				GuildController.CONVERSION_FACTOR ** 2,
			maximumFilesLength: 2,
		}),
	)
	protected async updateBotProfile(
		@Body(ZodValidationPipe(UpdateBotProfileSchema)) body: UpdateBotProfileSchemaDto,

		@Param('guildId') guildId: string,

		@UploadedFile('avatar') avatarFile: MultipartFile | null,
		@UploadedFile('banner') bannerFile: MultipartFile | null,
	): Promise<void> {
		return await this.guildService.updateBotProfile(guildId, {
			...body,
			avatarFile,
			bannerFile,
		});
	}
}
