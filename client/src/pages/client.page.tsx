import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Tag } from 'antd';
import AntCard from '@/components/elements/card/card.element';
import AntTable from '@/components/elements/table/table.element';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import ClientProvider from '@/providers/client.provider';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ClientDTO } from '@/types/fieldTypes';
import { ChangeEvent, useState } from 'react';
import AntInput from '@/components/elements/Input/Input.element';

type Props = {};
interface DataType {
	key: string;
	clientName: string;
	onBoardingDate: string;
	industry: string;
	manager: string;
}
const columns: ColumnsType<DataType> = [
	{
		title: <span className="text-blue-950">Client Name</span>,
		dataIndex: 'clientName',
		key: 'clientName',
		render: text => <a>{text}</a>,
	},
	{
		title: <span className="text-blue-950">On Boarding Date</span>,
		dataIndex: 'onBoardingDate',
		key: 'onBoardingDate',
	},
	{
		title: <span className="text-blue-950">Industry</span>,
		dataIndex: 'industry',
		key: 'industry',
	},
	{
		title: <span className="text-blue-950">Manager</span>,
		dataIndex: 'manager',
		key: 'manager',
	},
	{
		title: <span className="text-blue-950">Action</span>,
		dataIndex: 'action',
		key: 'action',
		render: (row, rowIndex) => {
			// console.log({ row, rowIndex });

			return (
				<div className="flex gap-5">
					<EditOutlined
						className="hover:text-blue-500"
						// onClick={() => handleEdit(rowIndex)}
					/>
					<DeleteOutlined
						className="hover:text-red-600"
						// onClick={handleDelete}
					/>
				</div>
			);
		},
	},
];
const Client = (props: Props) => {
	const [open, setOpen] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [clinetDetails, setClientDetails] = useState({} as ClientDTO);

	const clientList = useSelector((state: RootState) => state.client.clientList);
	console.log({ clientList });

	const onCancel = () => {
		setOpen(false);
	};

	const showModal = () => {
		console.log('helo im  here in model---');
		console.log('ths.project detail---', clinetDetails);
		setOpen(true);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setClientDetails({ ...clinetDetails, [name]: value });
	};
	return (
		<ClientProvider>
			<div className="flex flex-col justify-center gap-4 p-4">
				<div className="flex justify-end p-4">
					<Button
						type="primary"
						onClick={showModal}
						icon={<PlusOutlined />}
						shape="round"
						size={'large'}
						className="bg-blue-950"
					>
						Create
					</Button>
				</div>
				<AntCard cardTitle="CLIENT SUMMARY">
					<AntTable columns={columns} data={clientList}></AntTable>
				</AntCard>

				<Modal
					open={open}
					onCancel={onCancel}
					width={800}
					title={<span className="mb-10 text-blue-950">{isEdit ? 'Edit Client' : 'Create Client'}</span>}
				>
					<div className="grid py-4 grid-rows-5 text-blue-950 grid-flow-col gap-2 items-start w-[100%]">
						<AntInput
							name={'projectName'}
							label="Client Name"
							placeHolder={'Enter Your Client Name'}
							value={clinetDetails.clientName}
							onChange={handleChange}
						></AntInput>
						<AntInput
							name={'customer'}
							label="Industry"
							placeHolder={'Enter Your expertise field'}
							value={clinetDetails.manager}
							onChange={handleChange}
						></AntInput>
					</div>
				</Modal>
			</div>
		</ClientProvider>
	);
};

export default Client;
