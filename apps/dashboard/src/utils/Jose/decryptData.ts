import { compactDecrypt } from 'jose';
import { ENCRYPTION_SECRET_ENCODED } from '#lib/Constants.ts';

export async function decryptData(encryptedData: string): Promise<string> {
	return await compactDecrypt(encryptedData, ENCRYPTION_SECRET_ENCODED).then(
		({ plaintext }) => new TextDecoder().decode(plaintext),
	);
}
