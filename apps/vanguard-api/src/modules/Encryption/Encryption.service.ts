import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { getEnvVariable } from '#utils/Process/getEnvVariable.js';

@Injectable()
export class EncryptionService {
	private static ENCRYPTION_ALGORITHM = 'aes-256-gcm' as const;
	private static ENCRYPTION_IV_LENGTH = 16 as const;
	private static ENCRYPTION_SECRET = getEnvVariable('ENCRYPTION_SECRET');

	public decrypt(encryptedData: string): string {
		const [ivHex, authTagHext, encryptedHex] = encryptedData.split(':');

		const iv = Buffer.from(ivHex, 'hex');
		const authTag = Buffer.from(authTagHext, 'hex');
		const encrypted = Buffer.from(encryptedHex, 'hex');

		const decipher = createDecipheriv(EncryptionService.ENCRYPTION_ALGORITHM, EncryptionService.ENCRYPTION_SECRET, iv);

		decipher.setAuthTag(authTag);

		const decryptedBuffer = Buffer.concat([
			decipher.update(encrypted),
			decipher.final(),
		]);

		const decryptedString = decryptedBuffer.toString('utf-8');

		return decryptedString;
	}

	public encrypt(plainData: string): string {
		const ivBytes = randomBytes(EncryptionService.ENCRYPTION_IV_LENGTH);
		const cipher = createCipheriv(EncryptionService.ENCRYPTION_ALGORITHM, EncryptionService.ENCRYPTION_SECRET, ivBytes);

		const encryptedBuffer = Buffer.concat([
			cipher.update(plainData, 'utf-8'),
			cipher.final(),
		]);

		const authTag = cipher.getAuthTag();

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
