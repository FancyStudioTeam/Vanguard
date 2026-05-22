/**
 * @see https://docs.discord.com/developers/topics/permissions#permission-overwrites
 */
export function hasPermission(userPermissions: bigint, permission: bigint): boolean {
	return (userPermissions & permission) === permission;
}
