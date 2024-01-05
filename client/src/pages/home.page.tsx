import Card from 'antd/es/card/Card';
import { FaUsers } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { AiFillProject } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

export default function Home() {
	return (
		<div className="flex justify-center flex-wrap gap-4 w-full p-4  bg-white-100 ">
			<Card className=" w-full">
				<div className="flex gap-8 ">
					<div className="flex  items-center w-full justify-between text-xl font-extrabold">
						Dashboard <MdDashboard size={50} />
					</div>
				</div>
			</Card>
			<div className="flex justify-between gap-3 w-full">
				<Card className="w-full">
					<div className="flex  items-center w-full justify-between text-xl font-extrabold">
						Users <FaUsers size={50} />
					</div>
				</Card>
				<Card className="w-full">
					<div className="flex  items-center w-full justify-between text-xl font-extrabold">
						Clients <FaHandshake size={50} />
					</div>
				</Card>
				<Card className="w-full">
					<div className="flex  items-center w-full justify-between text-xl font-extrabold">
						Projects <AiFillProject size={50} />
					</div>
				</Card>
				<Card className="w-full">
					<div className="flex  items-center w-full justify-between text-xl font-extrabold">
						Tasks <FaTasks size={50} />
					</div>
				</Card>
			</div>
		</div>
	);
}
