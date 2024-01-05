import mongoose, { Schema } from 'mongoose';
import { ClientInterface } from '../Interfaces/client.interface';

const Client: Schema = new Schema(
	{
		clientName: { type: String },
		onBoardingDate: { type: String },
		industry: { type: String },
		managerList: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
	},
	{ versionKey: false },
);

export default mongoose.model<ClientInterface>('Client', Client);
0;
