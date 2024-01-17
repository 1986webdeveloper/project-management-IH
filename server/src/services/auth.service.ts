import { UserInterface } from '../Interfaces/user.interface';
import User from '../models/User.schema';

export const AuthService = new (class {
	constructor() {}
	registerUser = async (userData: UserInterface) => {
		const user = await User.create({
			email: userData.email,
			password: userData.password,
			name: userData.name.trim(),
			designation: userData.designation,
			role: userData.role,
			department: userData.department,
			date_of_birth: userData.date_of_birth,
			profile_Picture: userData.profile_Picture,
			userStatus: userData.userStatus,
			_id: userData._id,
		});

		if (user) {
			user.save();
			return user;
		}
	};
})();
