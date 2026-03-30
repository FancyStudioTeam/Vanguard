import 'server-only';

import { AES, enc } from 'crypto-js';
import { ENCRYPTION_KEY } from './Constants.ts';

export const EncryptionUtils = {
	decrypt(encryptedData: string): string {
		const unencryptedBytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
		const unencryptedString = unencryptedBytes.toString(enc.Utf8);

		return unencryptedString;
	},

	encrypt(unencryptedData: string): string {
		const encryptedBytes = AES.encrypt(unencryptedData, ENCRYPTION_KEY);
		const encryptedString = encryptedBytes.toString();

		return encryptedString;
	},
} as const;
