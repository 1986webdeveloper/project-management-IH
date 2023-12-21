import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
	const JWT_SECRET = process.env.JWT_SECRET;
	const payload = {
		email: user.email,
		password: user.password,
		name: user.name,
	};

	const options = {
		expiresIn: '1h',
	};

	return jwt.sign(payload, JWT_SECRET, options);
};

export const decryptGeneratedToken = (token: string) => {
	const JWT_SECRET = process.env.JWT_SECRET;
	const decodedPayload = jwt.verify(token, JWT_SECRET);
	console.log(decodedPayload);
	return decodedPayload;
};
