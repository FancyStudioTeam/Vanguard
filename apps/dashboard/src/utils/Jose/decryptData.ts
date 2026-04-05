import { compactDecrypt } from 'jose';
import { ENCRYPTION_SECRET_ENCODED } from '#lib/Constants.ts';

export async function decryptData(encryptedData: string): Promise<string> {
	const { plaintext: decryptedPlainText } = await compactDecrypt(
		encryptedData,
		ENCRYPTION_SECRET_ENCODED,
	);
	const decryptedData = new TextDecoder().decode(decryptedPlainText);

	return decryptedData;
}
