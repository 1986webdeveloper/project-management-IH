import { Request, Response } from 'express';
import { UserInterface } from '../Interfaces/user.interface';
import { encryptionHelper } from '../helpers/encryption.helper';
import { errorResponseHelper, successResponseHelper } from '../helpers/response.helper';
import { checkValidation } from '../helpers/validation.helper';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserValidation } from '../validations/user.validation';
import { decryptAndVerifyToken } from '../helpers/token.helper';

export default class UserController {
	protected readonly CreateUser = async (req: Request, res: Response) => {
		try {
			const payload = req.body;

			// *Validation of body
			const validObj = new UserValidation();

			Object.assign(validObj, payload);

			const _errMessage = await checkValidation(validObj);

			if (_errMessage) {
				return res.status(422).json(errorResponseHelper({ message: _errMessage, status: 'Error', statusCode: 422 }));
			}

			// *Checking for duplicate user
			const userExists = await UserService.getUserByEmail(payload.email);
			if (userExists) {
				return res
					.status(403)
					.json(errorResponseHelper({ message: 'User already registered', status: 'Error', statusCode: 403 }));
			}

			// *Password hashing
			const hashedPassword = encryptionHelper(process.env.RESET_PASSWORD);

			const user: UserInterface | null = await AuthService.registerUser({
				...payload,
				password: hashedPassword,
			} as UserInterface);

			// *storing into database
			if (user) {
				if (!user.profile_Picture) {
					user.profile_Picture = user.profile_Picture ? user.profile_Picture : 'uploads/007_default _avatar.png';
				}
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

	protected readonly UpdateUser = async (req: Request, res: Response) => {
		try {
			const userId: string = req.params.id;
			const payload = req.body;
			const user = await UserService.getUserById(userId);
			if (!userId && !user) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No user found', status: 'Error', statusCode: 400 }));
			}
			const updatedUser = await UserService.updateUser(userId, payload);
			if (!updatedUser) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'User data is not valid', status: 'Error', statusCode: 400 }));
			}

			return res.status(200).json(
				successResponseHelper({
					message: 'User data updated Successfully',
					status: 'Success',
					statusCode: 200,
					data: updatedUser,
				}),
			);
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly GetUser = async (req: Request, res: Response) => {
		try {
			const userId = req.params.id;
			const token = req.headers.authorization;
			const role = req.query.role;

			if (!userId) {
				let usersList: UserInterface[];
				if (role) {
					usersList = await UserService.getUsersByRole(role.toString());
				} else {
					usersList = await UserService.getUserList();
				}
				// const decrypted: any = decryptAndVerifyToken(token.split(' ')[1]);
				// const user = await UserService.getUserByEmail(decrypted.email);
				// const filteredList = usersList.filter(x => x.email !== user.email);

				return res.status(200).json(
					successResponseHelper({
						message: 'User list fetched Successfully',
						status: 'Success',
						statusCode: 200,
						data: usersList,
					}),
				);
			} else {
				const user = await UserService.getUserById(userId);
				return res.status(200).json(
					successResponseHelper({
						message: 'User fetched Successfully',
						status: 'Success',
						statusCode: 200,
						data: user,
					}),
				);
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly DeleteUser = async (req: Request, res: Response) => {
		try {
			const userId: string = req.params.id;
			if (!userId) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No User found', status: 'Error', statusCode: 400 }));
			}
			const isDeleted = await UserService.deleteUser(userId);
			if (isDeleted) {
				return res.status(200).json(
					successResponseHelper({
						message: 'User deleted Successfully',
						status: 'Success',
						statusCode: 200,
					}),
				);
			} else {
				return res
					.status(404)
					.json(errorResponseHelper({ message: 'No User found to delete', status: 'Error', statusCode: 404 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};
}
