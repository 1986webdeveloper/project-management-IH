/* eslint-disable @typescript-eslint/no-explicit-any */
import AntCard from '@/components/elements/card/card.element';
import AntTable from '@/components/elements/table/table.element';
import { Modal, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ChangeEvent, useState } from 'react';
import { ClientDTO, ProjectDTO } from '@/types/fieldTypes';
import AntSelect from '@/components/elements/select/select.element';
import AntDatePicker from '@/components/elements/datePicker/datePicker.element';
import { Dayjs } from 'dayjs';
import AntMultiSelect from '@/components/elements/multiSelect/multiSelect.element';
import { useDispatch } from 'react-redux';
import AntInput from '@/components/elements/Input/Input.element';
import ProjectService from '@/utils/service/project.service';
import { errorToastHelper } from '@/utils/helper/toast.helper';
import {
	initProject,
	StatusList,
	technologyConstant,
	PriorityList,
	STATUS_ENUM,
	PRIORITY_ENUM,
} from '@/constants/general.constants';

import { USER_ROLES } from '@/constants/user.constant';
import useList from '@/utils/helper/array.helper';
import DeleteButton from '@/components/elements/buttons/deleteButton.element';
import EditButton from '@/components/elements/buttons/editButton.element';
import CreateButton from '@/components/elements/buttons/createButton.element';

interface ProjectProps {
	projectList: ProjectDTO[];
	clientList: ClientDTO[];
}

const Project = ({ projectList, clientList }: ProjectProps) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [projectDetails, setProjectDetails] = useState(initProject);
	const dispatch = useDispatch();
	const { CreateProject, UpdateProject, DeleteProject } = ProjectService({ dispatch, setLoading });
	const [isEdit, setEdit] = useState(false);
	const { ModuleList, roleHelper } = useList();
	const columns: ColumnsType<ProjectDTO> = [
		{
			title: <span className="text-blue-950">Project Name</span>,
			dataIndex: 'projectName',
			key: 'projectName',
			render: text => <a>{text}</a>,
		},
		{
			title: <span className="text-blue-950">Client</span>,
			dataIndex: 'clientId',
			key: 'clientId',
			render: text => {
				return <a>{ModuleList(clientList, 'clientName').keyLabelValuePair[text]?.label}</a>;
			},
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
			title: <span className="text-blue-950">Estimated Hours</span>,
			dataIndex: 'estimatedHours',
			key: 'estimatedHours',
		},

		{
			title: <span className="text-blue-950">Priority</span>,
			key: 'priority',
			dataIndex: 'priority',
			render: (_, { priority }) => {
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
			});
		}
		if (isEdit) {
			UpdateProject({
				payload: projectDetails,
				setIsEdit: setEdit,
				setOpen: setOpen,
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
		DeleteProject({ projectId: data?._id ?? '' });
	};

	return (
		<div className="flex flex-col justify-center gap-4 p-4">
			<AntCard
				cardTitle={
					<div className="flex w-full items-center justify-between p-4">
						<span className="text-xl">Project Summary</span>
						<CreateButton onCreate={showModal} />
					</div>
				}
			>
				<AntTable columns={columns} data={projectList} />
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

					<AntSelect
						id="clientId"
						options={ModuleList(clientList, 'clientName').labelValuePair}
						label={'Client'}
						placeHolder={'Client'}
						onChange={e => handleSelect(e, 'clientId')}
						value={projectDetails.clientId}
					/>
					<AntSelect
						id="reportingManager"
						options={roleHelper(USER_ROLES.MANAGER).labelValuePair}
						label={'Reporting manager'}
						placeHolder={'Select Manager'}
						onChange={e => handleSelect(e, 'reportingManager')}
						value={projectDetails.reportingManager}
					/>
					<div className="flex gap-4">
						<AntDatePicker
							name={'startDate'}
							value={projectDetails?.startDate?.length > 0 ? projectDetails.startDate : ''}
							label="Start Date"
							onChange={(date, dateString) => handleDateSelect(date, dateString, 'startDate')}
						/>
						<AntDatePicker
							name={'deadlineDate'}
							value={projectDetails?.deadlineDate?.length > 0 ? projectDetails.deadlineDate : ''}
							label="Deadline date"
							onChange={(date, dateString) => handleDateSelect(date, dateString, 'deadlineDate')}
						/>
					</div>
					<AntMultiSelect
						width={330}
						value={projectDetails.assignedEmployeeList}
						label="Employees"
						placeHolder="Select Employees"
						options={roleHelper(USER_ROLES.EMPLOYEE).labelValuePair}
						onChange={e => {
							handleMultiSelect(e, 'assignedEmployeeList');
						}}
						optionLabel={'label'}
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
					/>
					<AntSelect
						options={PriorityList}
						label={'Priority'}
						placeHolder={'Select'}
						onChange={e => handleSelect(e, 'priority')}
						value={projectDetails.priority}
						id={'priority'}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default Project;
