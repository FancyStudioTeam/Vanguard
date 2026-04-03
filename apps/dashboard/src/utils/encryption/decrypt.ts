import 'server-only';
import { AES, enc } from 'crypto-js';
import { ENCRYPTION_KEY } from '#/lib/Constants.ts';

export function decrypt(encryptedData: string): string {
	const unencryptedBytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
	const unencryptedString = unencryptedBytes.toString(enc.Utf8);

	return unencryptedString;
}
