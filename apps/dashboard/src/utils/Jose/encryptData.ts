import { CompactEncrypt } from 'jose';
import { JOSE_ENCRYPTION_SECRET } from '#lib/Constants/Jose.ts';

export async function encryptData(unencryptedData: string): Promise<string> {
	const compactEncryptData = new TextEncoder().encode(unencryptedData);
	const compactEncrypt = new CompactEncrypt(compactEncryptData);

	compactEncrypt.setProtectedHeader({
		alg: 'dir',
		enc: 'A256GCM',
	});

	return await compactEncrypt.encrypt(JOSE_ENCRYPTION_SECRET);
}
