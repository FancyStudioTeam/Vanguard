import { compactDecrypt } from 'jose';
import { JOSE_ENCRYPTION_SECRET } from '#lib/Constants/Jose.ts';

export async function decryptData(encryptedData: string): Promise<string> {
	return await compactDecrypt(encryptedData, JOSE_ENCRYPTION_SECRET).then(
		({ plaintext }) => new TextDecoder().decode(plaintext),
	);
}
