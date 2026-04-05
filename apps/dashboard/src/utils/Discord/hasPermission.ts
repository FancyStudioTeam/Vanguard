export function hasPermission(
	userPermissions: string,
	permission: bigint,
): boolean {
	return (BigInt(userPermissions) & permission) === permission;
}
