import { SetMetadata } from '@nestjs/common';

export const BypassGuildPermissionsKey = 'bypass_guild_permissions' as const;
export const BypassGuildPermissions = () => SetMetadata(BypassGuildPermissionsKey, true);
