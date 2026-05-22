import { Reflector } from '@nestjs/core';

export const UseAuthPermissionsGuard = Reflector.createDecorator<boolean>();
