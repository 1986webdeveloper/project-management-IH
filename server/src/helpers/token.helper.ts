import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
	const JWT_SECRET = process.env.JWT_SECRET;
	const payload = {
		email: user.email,
		password: user.password,
		name: user.name,
	};

	const options = {
		expiresIn: '24h',
	};

	return jwt.sign(payload, JWT_SECRET, options);
};

export const decryptAndVerifyToken = (token: string) => {
	try {
		const JWT_SECRET = process.env.JWT_SECRET;
		const decodedPayload = jwt.verify(token, JWT_SECRET);
		return decodedPayload;
	} catch (error) {
		// Handle different types of errors during decryption
		if (error instanceof jwt.TokenExpiredError) {
			return 'Token expired';
		} else if (error instanceof jwt.JsonWebTokenError) {
			return 'Invalid token';
		} else {
			return 'Error decoding token';
		}
	}
};
