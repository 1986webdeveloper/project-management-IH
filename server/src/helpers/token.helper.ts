import jwt from 'jsonwebtoken';

export const tokenHelper = (user: any) => {
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
