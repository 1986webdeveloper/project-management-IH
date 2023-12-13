import { AES, enc } from 'crypto-js';

export const decryptionHelper = (data: any) => {
	const decryptedData = AES.decrypt(data, process.env.AES_KEY).toString(enc.Utf8);

	return decryptedData;
};
