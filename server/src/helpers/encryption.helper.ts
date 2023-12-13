import { AES } from 'crypto-js';

export const encryptionHelper = (data: any) => {
	const encryptedData = AES.encrypt(data.toString(), process.env.AES_KEY).toString();

	return encryptedData;
};
