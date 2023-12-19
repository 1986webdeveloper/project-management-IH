import { Types } from 'mongoose';
import User from '../models/User.schema';

export const UserService = new (class {
	constructor() {}

	getUserList = async () => {
		const _userList = await User.find();
		return _userList;
	};

	getUserById = async (userId: string) => {
		const _user = await User.findOne({ _id: userId });
		return _user;
	};

	getUserByEmail = async (email: string) => {
		const _user = await User.findOne({ email });
		return _user;
	};

	getUserByEmailLean = async (email: string) => {
		const _user = await User.findOne({ email }).lean();
		return _user;
	};

	updateUser = async (userId: Types.ObjectId | string, updateObj: any) => {
		const update = await User.findByIdAndUpdate(userId, updateObj, { returnDocument: 'after' }).exec();
		return update;
	};

	deleteUser = async (userId: Types.ObjectId | string) => {
		const user = await User.findByIdAndDelete(userId).exec();
		return user;
	};
})();
