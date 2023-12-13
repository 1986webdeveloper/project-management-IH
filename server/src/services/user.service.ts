import User from '../models/User.schema';

export const UserService = new (class {
	constructor() {}

	getUserByEmail = async (email: string) => {
		const _user = await User.findOne({ email });
		return _user;
	};

	getUserByEmailLean = async (email: string) => {
		const _user = await User.findOne({ email }).lean();
		return _user;
	};

	updateUser = async (userId: string, updateObj: any) => {
		const update = await User.findByIdAndUpdate(userId, updateObj);
		return update;
	};
})();
