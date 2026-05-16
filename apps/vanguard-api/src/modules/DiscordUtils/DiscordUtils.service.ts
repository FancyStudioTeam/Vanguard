import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordUtilsService {
	/**
	 * @see https://docs.discord.com/developers/topics/permissions#permission-overwrites
	 */
	public hasPermission(userPermissions: string, permission: bigint): boolean {
		return (BigInt(userPermissions) & permission) === permission;
	}
}
