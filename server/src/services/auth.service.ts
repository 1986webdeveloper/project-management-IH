import { UserInterface } from '../Interfaces/user.interface';
import User from '../models/User.schema';

export const AuthService = new (class {
	constructor() {}
	registerUser = async (userData: UserInterface) => {
		const user = await User.create({
			email: userData.email,
			password: userData.password,
			name: userData.name,
			designation: userData.designation,
			role: userData.role,
		});

		if (user) {
			user.save();
			return user;
		}
	};
})();
