import { validate } from 'class-validator';

export const checkValidation = async (userInput: any) => {
	const validateUser = await validate(userInput);
	const isErrorFound: any = validateUser.find(val => true);
	const messageObj = isErrorFound?.constraints ?? {};

	for (const key in messageObj) {
		return messageObj[key];
		// throw new HttpError(messageObj[key], HTTP_STATUS_CODE.bad_request);
	}
};
