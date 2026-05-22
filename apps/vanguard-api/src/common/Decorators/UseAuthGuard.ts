import { Reflector } from '@nestjs/core';

export const UseAuthGuard = Reflector.createDecorator<boolean>();
