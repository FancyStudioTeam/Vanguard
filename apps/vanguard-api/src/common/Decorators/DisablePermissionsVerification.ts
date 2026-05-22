import { SetMetadata } from '@nestjs/common';

export const DisablePermissionsVerification = () => SetMetadata('disable_permissions_verification', true);
