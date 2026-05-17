/**
 * @see https://docs.discord.com/developers/topics/permissions#permission-overwrites
 */
export function hasPermission(userPermissions: string, permission: bigint): boolean {
	return (BigInt(userPermissions) & permission) === permission;
}
