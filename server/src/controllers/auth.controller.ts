import { Request, Response } from 'express';
import { errorResponseHelper, successResponseHelper } from '../helpers/response.helper';
import { UserService } from '../services/user.service';
import { encryptionHelper } from '../helpers/encryption.helper';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../Interfaces/user.interface';
import { SignUpValidation, LoginValidation } from '../validations/auth.validation';
import { checkValidation } from '../helpers/validation.helper';
import { decryptionHelper } from '../helpers/decryption.helper';
import { decryptAndVerifyToken, generateToken } from '../helpers/token.helper';
import { sendMailer } from '../helpers/mailer.helper';

export default class AuthController {
	protected readonly Signup = async (req: Request, res: Response) => {
		try {
			const payload: SignUpValidation = req.body;
			// Validation of body
			const validObj = new SignUpValidation();
			Object.assign(validObj, payload);
			const _errMessage = await checkValidation(validObj);
			if (_errMessage) {
				return res.status(422).json(errorResponseHelper({ message: _errMessage, status: 'Error', statusCode: 422 }));
			}

			// Password hashing
			const hashedPassword = encryptionHelper(payload.password);
			const user: UserInterface | null = await AuthService.registerUser({
				...payload,
				password: hashedPassword,
			} as UserInterface);
			// storing into database
			if (user) {
				const resData = { email: user.email, name: user.name };
				return res.status(201).json(
					successResponseHelper({
						message: 'User data saved Successfully',
						status: 'Success',
						statusCode: 201,
						data: resData,
					}),
				);
			} else {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'User data is not valid', status: 'Error', statusCode: 400 }));
			}
		} catch (error: any) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly Login = async (req: Request, res: Response) => {
		try {
			const payload: LoginValidation = req.body;
			// * validate
			const validObj = new LoginValidation();
			Object.assign(validObj, payload);
			const _errMessage = await checkValidation(validObj);
			if (_errMessage) {
				return res.status(422).json(errorResponseHelper({ message: _errMessage, status: 'Error', statusCode: 422 }));
			}
			// * Compare and validate password
			const user = await UserService.getUserByEmailLean(payload.email);
			const decryptedPassword = decryptionHelper(user.password);

			if (user && payload.password === decryptedPassword) {
				const accessToken = generateToken(user);
				const _responseObj: any = {
					name: user.name,
					email: user.email,
					designation: user.designation,
					role: user.role,
					_id: user._id,
					accessToken,
				};
				return res.status(200).json(
					successResponseHelper({
						message: 'User logged in successfully',
						status: 'Success',
						statusCode: 200,
						data: _responseObj,
					}),
				);
			} else {
				return res
					.status(400)
					.json(
						errorResponseHelper({ message: 'User email or password is incorrect', status: 'Error', statusCode: 400 }),
					);
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Unregistered User.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly ForgotPassword = async (req: Request, res: Response) => {
		try {
			const payload = req.body;

			const user = await UserService.getUserByEmail(payload.email);

			if (!user) {
				return res
					.status(400)
					.json(
						errorResponseHelper({ message: 'User email or password is incorrect', status: 'Error', statusCode: 400 }),
					);
			}
			const _tempPassword = process.env.RESET_PASSWORD; //to do new generation of password
			const _encryptedPassword = encryptionHelper(_tempPassword);
			const _updateUser = await UserService.updateUser(user._id, { password: _encryptedPassword });

			if (!_updateUser) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'Unable to change password', status: 'Error', statusCode: 400 }));
			}

			sendMailer({
				userMail: process.env.ADMIN_MAIL,
				mailText: `User id: ${user.id} has requested to reset password new password is ${_tempPassword}  `,
				subject: 'Forgot password request',
			});
			sendMailer({
				userMail: user.email,
				mailText: `Your request to reset password is accepted, your new password is ${_tempPassword}  `,
				subject: 'Forgot password request',
			});

			return res.status(200).json(
				successResponseHelper({
					message: 'Updated password sent to admin.',
					status: 'Success',
					statusCode: 200,
				}),
			);
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly CurrentUser = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization;

			const decrypted: any = decryptAndVerifyToken(token.split(' ')[1]);

			let user = await UserService.getUserByEmail(decrypted.email);

			if (user) {
				const userObj = {
					_id: user._id,
					name: user.name,
					email: user.email,
					designation: user.designation,
					role: user.role,
				};
				return res.status(200).json(
					successResponseHelper({
						message: 'User fetched successfully',
						status: 'Success',
						statusCode: 200,
						data: userObj,
					}),
				);
			} else {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No user found', status: 'Error', statusCode: 400 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Unauthorized User.', status: 'Error', statusCode: 500, error }));
		}
	};
}
