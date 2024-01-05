import { Modal, Tag } from 'antd';
import { ChangeEvent, useState } from 'react';
import AntCard from '@/components/elements/card/card.element';
import AntTable from '@/components/elements/table/table.element';
import { ColumnsType } from 'antd/es/table';
import { ProjectDTO, TaskDTO } from '@/types/fieldTypes';
import AntInput from '@/components/elements/Input/Input.element';
import AntDatePicker from '@/components/elements/datePicker/datePicker.element';
import AntSelect from '@/components/elements/select/select.element';
import { initTask, StatusList, PriorityList, PRIORITY_ENUM, STATUS_ENUM } from '@/constants/general.constants';
import TaskService from '@/utils/service/task.service';
import { useDispatch } from 'react-redux';
import { errorToastHelper } from '@/utils/helper/toast.helper';
import { USER_ROLES } from '@/constants/user.constant';
import useList from '@/utils/helper/array.helper';
import DeleteButton from '@/components/elements/buttons/deleteButton.element';
import EditButton from '@/components/elements/buttons/editButton.element';
import CreateButton from '@/components/elements/buttons/createButton.element';

interface TaskProps {
	taskList: TaskDTO[];
	projectList: ProjectDTO[];
}

const Task = ({ taskList, projectList }: TaskProps) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [taskDetails, setTaskDetails] = useState(initTask);
	const [isEdit, setEdit] = useState(false);
	const dispatch = useDispatch();
	const { roleHelper, ModuleList } = useList();
	const { CreateTask, UpdateTask, deleteTask } = TaskService({ dispatch, setLoading });

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
			render: text => {
				return <a>{roleHelper(USER_ROLES.MANAGER).keyLabelValuePair[text]?.label} </a>;
			},
		},
		{
			title: <span className="text-blue-950">Project Name</span>,
			dataIndex: 'projectName',
			key: 'projectName',
			render: text => {
				return <a>{ModuleList(projectList, 'projectName').keyLabelValuePair[text]?.label} </a>;
			},
		},
		{
			title: <span className="text-blue-950">Priority</span>,
			key: 'priority',
			dataIndex: 'priority',
			render: (_, { priority }) => {
				console.log(priority);
				const color = priority === PRIORITY_ENUM.HIGH ? 'red' : priority === PRIORITY_ENUM.LOW ? 'skyblue' : 'orange';
				return <Tag color={color}>{priority.toUpperCase()}</Tag>;
			},
		},
		{
			title: <span className="text-blue-950">Status</span>,
			key: 'status',
			dataIndex: 'status',
			render: (_, { status }) => {
				const color = status === STATUS_ENUM.HOLD ? 'grey' : status === STATUS_ENUM.COMPLETED ? 'green' : 'blue';

				return <Tag color={color}>{status.toUpperCase()}</Tag>;
			},
		},

		{
			title: <span className="text-blue-950">Action</span>,
			dataIndex: 'action',
			key: 'action',
			render: (_, rowData) => {
				return (
					<div className="flex gap-5">
						<EditButton onClick={onEdit} rowData={rowData} />
						<DeleteButton loading={loading} onDelete={onDelete} rowData={rowData} />
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
		});
	};

	const onSubmit = () => {
		if (!isEdit) {
			CreateTask({
				payload: taskDetails,
				setOpen: setOpen,
			});
		}
		if (isEdit) {
			UpdateTask({
				payload: taskDetails,
				setIsEdit: setEdit,
				setOpen: setOpen,
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

	const handleDateSelect = (date: any, dateString: string, id: string) => {
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
						<CreateButton onCreate={showModal} />
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
				<div className="grid py-4 grid-rows-4 text-blue-950 grid-flow-col gap-14 items-start w-[100%]">
					<AntInput
						name={'title'}
						label="Title"
						placeHolder={'Enter Your task Name'}
						value={taskDetails.title}
						onChange={handleChange}
					/>
					<AntSelect
						id="projectName"
						options={ModuleList(projectList, 'projectName').labelValuePair}
						label={'Project name'}
						placeHolder={'Please select project'}
						onChange={e => handleSelect(e, 'projectName')}
						value={taskDetails.projectName}
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
						/>
						<AntDatePicker
							name={'deadlineDate'}
							value={taskDetails?.endDate?.length > 0 ? taskDetails.endDate : ''}
							label="Deadline date"
							onChange={(date, dateString) => handleDateSelect(date, dateString, 'endDate')}
						/>
					</div>
					<AntSelect
						id="reportingManager"
						options={roleHelper(USER_ROLES.MANAGER).labelValuePair}
						label="Reporting manager"
						placeHolder={'Enter reporting manager'}
						onChange={e => handleSelect(e, 'reportingManager')}
						value={taskDetails.reportingManager}
					/>
					<AntSelect
						id="reportedBy"
						options={roleHelper(USER_ROLES.EMPLOYEE).labelValuePair}
						label="Reported By"
						placeHolder={'Enter rapporteur'}
						onChange={e => handleSelect(e, 'reportedBy')}
						value={taskDetails.reportedBy}
					/>

					<AntSelect
						id="status"
						options={StatusList}
						label={'Status'}
						placeHolder={'Select'}
						onChange={e => handleSelect(e, 'status')}
						value={taskDetails.status}
					/>

					<AntSelect
						options={PriorityList}
						label={'Priority'}
						placeHolder={'Select'}
						onChange={e => handleSelect(e, 'priority')}
						value={taskDetails.priority}
						id={'priority'}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default Task;
