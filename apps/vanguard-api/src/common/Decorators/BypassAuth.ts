import { SetMetadata } from '@nestjs/common';

export const BypassAuthKey = 'bypass_auth' as const;
export const BypassAuth = () => SetMetadata(BypassAuthKey, true);
