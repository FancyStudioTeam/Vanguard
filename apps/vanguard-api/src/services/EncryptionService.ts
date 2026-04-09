import { createCipheriv, randomBytes } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { getEnvVariable } from '#utils/Process/getEnvVariable.js';

@Injectable()
export class EncryptionService {
	static ENCRYPTION_ALGORITHM = 'aes-256-gcm' as const;
	static ENCRYPTION_IV_LENGTH = 16 as const;
	static ENCRYPTION_SECRET = getEnvVariable('ENCRYPTION_SECRET');

	public encrypt(plainData: string): string {
		const { ENCRYPTION_ALGORITHM, ENCRYPTION_IV_LENGTH, ENCRYPTION_SECRET } = EncryptionService;

		const ivBytes = randomBytes(ENCRYPTION_IV_LENGTH);
		const cipher = createCipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_SECRET, ivBytes);

		const authTag = cipher.getAuthTag();

		const encryptedBuffer = Buffer.concat([
			cipher.update(plainData, 'utf-8'),
			cipher.final(),
		]);

		const result = [
			ivBytes,
			authTag,
			encryptedBuffer,
		]
			.map((buffer) => buffer.toString('hex'))
			.join(':');

		return result;
	}
}
