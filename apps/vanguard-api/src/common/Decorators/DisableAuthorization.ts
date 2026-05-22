import { SetMetadata } from '@nestjs/common';

export const DisableAuthorization = () => SetMetadata('disable_authorization', true);
