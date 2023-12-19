/* eslint-disable @typescript-eslint/no-explicit-any */
import AntCard from '@/components/elements/card/card.element';
import AntTable from '@/components/elements/table/table.element';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
import { ProjectDTO } from '@/types/fieldTypes';
import AntSelect from '@/components/elements/select/select.element';
import AntDatePicker from '@/components/elements/datePicker/datePicker.element';
import { Dayjs } from 'dayjs';
import AntMultiSelect from '@/components/elements/multiSelect/multiSelect.element';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import AntInput from '@/components/elements/Input/Input.element';
import ProjectService from '@/utils/service/project.service';
import { errorToastHelper } from '@/utils/helper/toast.helper';
import { initProject, StatusList, technologyConstant, PriorityList } from '@/constants/general.constants';

const Project = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [projectDetails, setProjectDetails] = useState(initProject);
	const { CreateProject, UpdateProject, DeleteProject } = ProjectService();
	const [isEdit, setEdit] = useState(false);
	const projectList = useSelector((state: RootState) => state.project.projectList);
	const dispatch = useDispatch();
	const columns: ColumnsType<ProjectDTO> = [
		{
			title: <span className="text-blue-950">Project Name</span>,
			dataIndex: 'projectName',
			key: 'projectName',
			render: text => <a>{text}</a>,
		},
		{
			title: <span className="text-blue-950">Client</span>,
			dataIndex: 'client',
			key: 'client',
		},
		{
			title: <span className="text-blue-950">Start Date</span>,
			dataIndex: 'startDate',
			key: 'startDate',
		},
		{
			title: <span className="text-blue-950">Deadline</span>,
			dataIndex: 'deadlineDate',
			key: 'deadlineDate',
		},
		{
			title: <span className="text-blue-950">Assigned Employee</span>,
			dataIndex: 'assignedEmployee',
			key: 'assignedEmployee',
		},
		{
			title: <span className="text-blue-950">Estimated Hours</span>,
			dataIndex: 'estimatedHours',
			key: 'estimatedHours',
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
			title: <span className="text-blue-950">Action</span>,
			dataIndex: 'action',
			key: 'action',
			render: (_, rowData) => {
				return (
					<div className="flex gap-5">
						<EditOutlined className="hover:text-blue-500" onClick={() => onEdit(rowData)} />
						<Popconfirm
							title="Delete the project"
							description="Are you sure to delete this project?"
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
		const { value, name, type } = e.target;
		setProjectDetails({
			...projectDetails,
			[name]: type === 'number' ? Number(value) : value,
		});
	};

	const handleSelect = (e: string, id: string) => {
		setProjectDetails({ ...projectDetails, [id]: e });
	};

	const handleDateSelect = (date: Dayjs | null, dateString: string, id: string) => {
		setProjectDetails({ ...projectDetails, [id]: dateString });
	};

	// *modal actions
	const handleCancel = () => {
		setProjectDetails(initProject);

		setOpen(false);
		setEdit(false);
	};

	const showModal = () => {
		setProjectDetails(initProject);
		setOpen(true);
	};

	const handleMultiSelect = (e: any, name: string) => {
		setProjectDetails({ ...projectDetails, [name]: e });
	};

	// *FormActions

	const onSubmit = () => {
		if (!isEdit) {
			CreateProject({
				payload: projectDetails,
				setOpen: setOpen,
				dispatch,
				setLoading,
			});
		}
		if (isEdit) {
			UpdateProject({
				payload: projectDetails,
				setIsEdit: setEdit,
				setOpen: setOpen,
				dispatch,
				setLoading,
			});
		}
	};

	const onEdit = (data: ProjectDTO) => {
		setProjectDetails(data);
		setOpen(true);
		setEdit(true);
	};

	const onDelete = (data: ProjectDTO) => {
		if (!data._id) return errorToastHelper('Project ID not found!!S');
		DeleteProject({ projectId: data?._id ?? '', setLoading, dispatch });
	};

	return (
		<div className="flex flex-col justify-center gap-4 p-4">
			<AntCard
				cardTitle={
					<div className="flex w-full items-center justify-between p-4">
						<span className="text-xl">Project Summary</span>
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
				<AntTable columns={columns} data={projectList}></AntTable>
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
				<div className="grid py-7 grid-rows-5 text-blue-950 grid-flow-col  items-start w-[100%]">
					<AntInput
						name={'projectName'}
						label="Project Name"
						placeHolder={'Enter Your Project Name'}
						value={projectDetails.projectName}
						onChange={handleChange}
					/>
					<AntInput
						name={'clientId'}
						label="ClientId"
						placeHolder={'Enter Your Customer Name'}
						value={projectDetails.clientId}
						onChange={handleChange}
						disabled
					/>
					<div className="flex gap-4">
						<AntDatePicker
							name={'startDate'}
							value={projectDetails?.startDate?.length > 0 ? projectDetails.startDate : ''}
							label="Start Date"
							onChange={(date, dateString) => handleDateSelect(date, dateString, 'startDate')}
						></AntDatePicker>
						<AntDatePicker
							name={'deadlineDate'}
							value={projectDetails?.deadlineDate?.length > 0 ? projectDetails.deadlineDate : ''}
							label="Deadline date"
							onChange={(date, dateString) => handleDateSelect(date, dateString, 'deadlineDate')}
						></AntDatePicker>
					</div>
					<AntInput
						name={'assignedEmployee'}
						label="Assigned employee"
						placeHolder={'Enter AssigneeS'}
						value={projectDetails.assignedEmployee}
						onChange={handleChange}
					/>
					<AntInput
						name={'estimatedHours'}
						label="Estimated Hours"
						placeHolder={'Enter Estimated Hours'}
						value={projectDetails.estimatedHours?.toString()}
						onChange={handleChange}
						type="number"
					/>
					<AntSelect
						id="status"
						options={StatusList}
						label={'Status'}
						placeHolder={'Select'}
						onChange={e => handleSelect(e, 'status')}
						value={projectDetails.status}
					></AntSelect>
					<AntInput
						name={'profile'}
						label="Profile"
						placeHolder={'Enter Your Profile Name'}
						value={projectDetails.profile}
						onChange={handleChange}
					/>
					<AntMultiSelect
						width={330}
						value={projectDetails.technologyList}
						label="Technologies used"
						placeHolder="Select Technology"
						options={technologyConstant}
						onChange={e => {
							handleMultiSelect(e, 'technologyList');
						}}
						optionLabel={'label'}
					></AntMultiSelect>
					<AntSelect
						options={PriorityList}
						label={'Priority'}
						placeHolder={'Select'}
						onChange={e => handleSelect(e, 'priority')}
						value={projectDetails.priority}
						id={'priority'}
					></AntSelect>
				</div>
			</Modal>
		</div>
	);
};

export default Project;
