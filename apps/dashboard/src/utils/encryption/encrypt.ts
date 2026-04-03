import 'server-only';
import { AES } from 'crypto-js';
import { ENCRYPTION_KEY } from '#/lib/Constants.ts';

export function encrypt(unencryptedData: string): string {
	const encryptedBytes = AES.encrypt(unencryptedData, ENCRYPTION_KEY);
	const encryptedString = encryptedBytes.toString();

	return encryptedString;
}
