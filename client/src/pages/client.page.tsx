import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import AntCard from '@/components/elements/card/card.element';
import AntTable from '@/components/elements/table/table.element';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ClientDTO } from '@/types/fieldTypes';
import { ChangeEvent, useEffect, useState } from 'react';
import AntInput from '@/components/elements/Input/Input.element';
import AntDatePicker from '@/components/elements/datePicker/datePicker.element';
import { Dayjs } from 'dayjs';
import ClientService from '@/utils/service/client.service';
import { errorToastHelper } from '@/utils/helper/toast.helper';
import { initClient } from '@/constants/general.constants';
import AntMultiSelect from '@/components/elements/multiSelect/multiSelect.element';
import { USER_ROLES } from '@/constants/user.constant';

const Client = () => {
	const [open, setOpen] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [clientDetails, setClientDetails] = useState(initClient);
	const clientList = useSelector((state: RootState) => state.client.clientList);
	const userList = useSelector((state: RootState) => state.user.userList);
	const { CreateClient, DeleteClient, UpdateClient } = ClientService();

	const dispatch = useDispatch();

	useEffect(() => {
		console.log(userList);
	}, []);

	const columns: ColumnsType<ClientDTO> = [
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
			render: (_, rowData) => {
				return (
					<div className="flex gap-5">
						<EditOutlined className="hover:text-blue-500" onClick={() => onEdit(rowData)} />

						<Popconfirm
							title="Delete the client"
							description="Are you sure to delete this client?"
							onConfirm={() => {
								onDelete(rowData);
							}}
							okText="Yes"
							cancelText="No"
							okButtonProps={{ className: 'bg-blue-950', loading: loading }}
							cancelButtonProps={{ danger: true, type: 'primary' }}
						>
							<DeleteOutlined className="hover:text-red-600" />
						</Popconfirm>
					</div>
				);
			},
		},
	];

	// *handle change
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setClientDetails({ ...clientDetails, [name]: value });
	};

	const handleDateSelect = (date: Dayjs | null, dateString: string, id: string) => {
		setClientDetails({ ...clientDetails, [id]: dateString });
	};

	// *modal actions
	const showModal = () => {
		setClientDetails(initClient);
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
		setEdit(false);
	};

	// *FormActions
	const onEdit = (data: ClientDTO) => {
		setClientDetails(data);
		setOpen(true);
		setEdit(true);
	};

	const onDelete = (data: ClientDTO) => {
		if (!data._id) return errorToastHelper('Project ID not found!!');
		DeleteClient({
			clientId: data?._id ?? '',
			setLoading,
			dispatch,
		});
	};

	const onSubmit = () => {
		if (!isEdit) {
			CreateClient({
				payload: clientDetails,
				setOpen: setOpen,
				dispatch,
				setLoading,
			});
		}
		if (isEdit) {
			UpdateClient({
				payload: clientDetails,
				setIsEdit: setEdit,
				setOpen: setOpen,
				dispatch,
				setLoading,
			});
		}
	};

	const handleMultiSelect = (e: any, name: string) => {
		console.log(e);
		setClientDetails({ ...clientDetails, [name]: [...e] });
	};

	const managerList = () => {
		const allUser = [...userList];
		// const _requiredList = [];

		const filtered = allUser.filter(x => {
			if (x.role === USER_ROLES.MANAGER) {
				const _obj = { label: x.name, value: x._id };
				return _obj;
			}
		});
		console.log(filtered);
		return filtered;
	};

	return (
		<div className="flex flex-col justify-center gap-4 p-4">
			<AntCard
				cardTitle={
					<div className="flex w-full items-center justify-between p-4">
						<span className="text-xl">Client Summary</span>
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
				}
			>
				<AntTable columns={columns} data={clientList}></AntTable>
			</AntCard>
			<Modal
				open={open}
				title={<span className="mb-10 text-blue-950">{isEdit ? 'Edit Project' : 'Create Project'}</span>}
				onOk={onSubmit}
				width={800}
				onCancel={handleCancel}
				okButtonProps={{ className: 'bg-blue-950', loading: loading }}
				okText={isEdit ? 'Update' : 'Save'}
				cancelButtonProps={{ danger: true, type: 'primary' }}
			>
				<div className="grid py-7 grid-rows-2 text-blue-950 grid-flow-col items-start w-[100%]">
					<AntInput
						name={'clientName'}
						label="Client Name"
						placeHolder={'Enter Your Client Name'}
						value={clientDetails.clientName}
						onChange={handleChange}
					/>
					<AntInput
						name={'industry'}
						label="Industry"
						placeHolder={'Enter Your expertise field'}
						value={clientDetails.industry}
						onChange={handleChange}
					/>
					<AntMultiSelect
						width={330}
						value={clientDetails.managerList}
						label="Managers"
						placeHolder="Select manager"
						options={managerList().map(x => {
							return { label: x.name, value: x._id };
						})}
						onChange={e => {
							handleMultiSelect(e, 'technologyList');
						}}
						optionLabel={'name'}
					/>
					<AntDatePicker
						name={'onBoardingDate'}
						value={clientDetails?.onBoardingDate?.length > 0 ? clientDetails?.onBoardingDate : ''}
						label="Onboarding Date"
						onChange={(date, dateString) => handleDateSelect(date, dateString, 'onBoardingDate')}
					></AntDatePicker>
				</div>
			</Modal>
		</div>
	);
};

export default Client;
