import { CompactEncrypt } from 'jose';
import { ENCRYPTION_SECRET_ENCODED } from '#lib/Constants.ts';

export async function encryptData(unencryptedData: Uint8Array): Promise<string> {
	return await new CompactEncrypt(unencryptedData)
		.setProtectedHeader({
			alg: 'dir',
			enc: 'A256GCM',
		})
		.encrypt(ENCRYPTION_SECRET_ENCODED);
}
