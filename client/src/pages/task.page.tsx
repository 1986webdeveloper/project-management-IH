import { Button, Modal, Popconfirm, Tag } from 'antd';
import { ChangeEvent, useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AntCard from '@/components/elements/card/card.element';
import AntTable from '@/components/elements/table/table.element';
import { ColumnsType } from 'antd/es/table';
import { TaskDTO } from '@/types/fieldTypes';
import AntInput from '@/components/elements/Input/Input.element';
import AntDatePicker from '@/components/elements/datePicker/datePicker.element';
import AntSelect from '@/components/elements/select/select.element';
import { Dayjs } from 'dayjs';
import { initTask, StatusList, PriorityList } from '@/constants/general.constants';
import TaskService from '@/utils/service/task.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { errorToastHelper } from '@/utils/helper/toast.helper';

const Task = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [taskDetails, setTaskDetails] = useState(initTask);
	const [isEdit, setEdit] = useState(false);
	const { CreateTask, UpdateTask, deleteTask } = TaskService();
	const taskList = useSelector((state: RootState) => state.task.taskList);
	const dispatch = useDispatch();

	const columns: ColumnsType<TaskDTO> = [
		{
			title: <span className="text-blue-950">Title</span>,
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: <span className="text-blue-950">Reporting Manager</span>,
			dataIndex: 'reportingManager',
			key: 'reportingManager',
		},
		{
			title: <span className="text-blue-950">Status</span>,
			key: 'status',
			dataIndex: 'status',
			render: (_, { status }) => {
				const color = status === 'HOLD' ? 'orange' : status === 'COMPLETED' ? 'green' : 'blue';

				return <Tag color={color}>{status.toUpperCase()}</Tag>;
			},
		},
		{
			title: <span className="text-blue-950">Priority</span>,
			dataIndex: 'priority',
			key: 'priority',
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
							title="Delete the task"
							description="Are you sure to delete this task?"
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

	const showModal = () => {
		setTaskDetails(initTask);
		setOpen(true);
	};

	const onEdit = (data: TaskDTO) => {
		setTaskDetails(data);
		setOpen(true);
		setEdit(true);
	};

	const onDelete = (data: TaskDTO) => {
		if (!data._id) return errorToastHelper('Task ID not found!!');
		deleteTask({
			taskId: data?._id ?? '',
			setLoading,

			dispatch,
		});
	};

	const onSubmit = () => {
		if (!isEdit) {
			CreateTask({
				payload: taskDetails,
				setOpen: setOpen,
				dispatch,
				setLoading,
			});
		}
		if (isEdit) {
			UpdateTask({
				payload: taskDetails,
				setIsEdit: setEdit,
				setOpen: setOpen,
				dispatch,
				setLoading,
			});
		}
	};

	const handleCancel = () => {
		setOpen(false);
		setEdit(false);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name, type } = e.target;
		setTaskDetails({
			...taskDetails,
			[name]: type === 'number' ? Number(value) : value,
		});
	};

	const handleDateSelect = (date: Dayjs | null, dateString: string, id: string) => {
		setTaskDetails({ ...taskDetails, [id]: dateString });
	};

	const handleSelect = (e: string, id: string) => {
		setTaskDetails({ ...taskDetails, [id]: e });
	};

	return (
		<div className="flex flex-col justify-center gap-4 p-4">
			<AntCard
				cardTitle={
					<div className="flex w-full items-center justify-between p-4">
						<span className="text-xl">Task Summary</span>
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
				<AntTable columns={columns} data={taskList}></AntTable>
			</AntCard>
			<Modal
				open={open}
				title={<span className="mb-10 text-blue-950">{isEdit ? 'Edit Task' : 'Create Task'}</span>}
				onOk={onSubmit}
				width={800}
				onCancel={handleCancel}
				okButtonProps={{ className: 'bg-blue-950', loading: loading }}
				okText={isEdit ? 'Update' : 'Save'}
				cancelButtonProps={{ danger: true, type: 'primary' }}
			>
				<div className="grid py-4 grid-rows-5 text-blue-950 grid-flow-col gap-16 items-start w-[100%]">
					<AntInput
						name={'title'}
						label="Title"
						placeHolder={'Enter Your task Name'}
						value={taskDetails.title}
						onChange={handleChange}
					/>
					<AntInput
						name={'projectName'}
						label="Project name"
						placeHolder={'Enter Your Project Name'}
						value={taskDetails.projectName}
						onChange={handleChange}
						disabled
					/>
					<AntInput
						name={'description'}
						label="Description"
						placeHolder={'Enter Your Customer Name'}
						value={taskDetails.description}
						onChange={handleChange}
					/>
					<div className="flex gap-4">
						<AntDatePicker
							name={'startDate'}
							value={taskDetails?.startDate?.length > 0 ? taskDetails.startDate : ''}
							label="Start Date"
							onChange={(date, dateString) => handleDateSelect(date, dateString, 'startDate')}
						></AntDatePicker>
						<AntDatePicker
							name={'deadlineDate'}
							value={taskDetails?.endDate?.length > 0 ? taskDetails.endDate : ''}
							label="Deadline date"
							onChange={(date, dateString) => handleDateSelect(date, dateString, 'endDate')}
						></AntDatePicker>
					</div>
					<AntInput
						name={'reportedBy'}
						label="Reported By"
						placeHolder={'Enter rapporteur'}
						value={taskDetails.reportedBy}
						onChange={handleChange}
					/>
					<AntInput
						name={'reportingManager'}
						label="Reporting manager"
						placeHolder={'Enter reporting manager'}
						value={taskDetails.reportingManager}
						onChange={handleChange}
					/>
					<AntSelect
						id="status"
						options={StatusList}
						label={'Status'}
						placeHolder={'Select'}
						onChange={e => handleSelect(e, 'status')}
						value={taskDetails.status}
					></AntSelect>
					<AntInput
						name={'assignee'}
						label="Assignee"
						placeHolder={'Enter your assignee name'}
						value={taskDetails.assignee}
						onChange={handleChange}
					/>
					<AntSelect
						options={PriorityList}
						label={'Priority'}
						placeHolder={'Select'}
						onChange={e => handleSelect(e, 'priority')}
						value={taskDetails.priority}
						id={'priority'}
					></AntSelect>
				</div>
			</Modal>
		</div>
	);
};

export default Task;
