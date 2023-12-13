import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export const connectDb = () => {
	console.log(process.env.MONGODB_URI);
	return mongoose.plugin(mongooseAutoPopulate).connect(
		process.env.MONGODB_URI,
		//     {
		//     dbName: process.env.DB_NAME,
		//     user: process.env.DB_USER,
		//     pass: process.env.DB_PASS,
		//   }
	);
};
