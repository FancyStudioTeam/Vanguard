import { CompactEncrypt } from 'jose';
import { ENCRYPTION_SECRET_ENCODED } from '#lib/Constants.ts';

export async function encryptData(unencryptedData: string): Promise<string> {
	const compactEncryptData = new TextEncoder().encode(unencryptedData);
	const compactEncrypt = new CompactEncrypt(compactEncryptData);

	compactEncrypt.setProtectedHeader({
		alg: 'dir',
		enc: 'A256GCM',
	});

	return await compactEncrypt.encrypt(ENCRYPTION_SECRET_ENCODED);
}
