import { Module } from '@nestjs/common';

import { EncryptionService } from './Encryption.service.js';

@Module({
	exports: [
		EncryptionService,
	],
	providers: [
		EncryptionService,
	],
})
export class EncryptionModule {}
