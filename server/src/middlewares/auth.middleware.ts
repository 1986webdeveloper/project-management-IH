import { NextFunction, Request, Response } from 'express';
import { decryptAndVerifyToken } from '../helpers/token.helper';
import { errorResponseHelper } from '../helpers/response.helper';
import { UserService } from '../services/user.service';

export class TokenMiddleware {
	public async checkToken(req: Request, res: Response, next: NextFunction) {
		const token = req.headers['authorization']?.split(' ')[1];
		if (!token) {
			return res
				.status(401)
				.json(errorResponseHelper({ message: 'Unauthorized - Token missing', status: 'Error', statusCode: 401 }));
		}
		const password = decryptAndVerifyToken(token);

		if (typeof password === 'string') {
			return res.status(401).json(errorResponseHelper({ message: password, status: 'Error', statusCode: 401 }));
		} else {
			//Checking for duplicate user
			const userNotAvailable = await UserService.getUserByEmail(password.email);
			if (!userNotAvailable) {
				return res
					.status(403)
					.json(errorResponseHelper({ message: 'User not available', status: 'Error', statusCode: 403 }));
			}
		}

		next();
	}
}
