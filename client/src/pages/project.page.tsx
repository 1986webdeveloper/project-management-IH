/* eslint-disable @typescript-eslint/no-explicit-any */
import AntCard from "@/components/elements/card/card.element";
import AntTable from "@/components/elements/table/table.element";
import { Button, Modal, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ChangeEvent, SetStateAction, useState } from "react";
import { ProjectDTO } from "@/types/fieldTypes";
import AntSelect from "@/components/elements/select/select.element";
import {
  ProjectPriority,
  ProjectStatus,
  initProject,
  technologyConstant,
} from "@/constants/project.constants";
import AntDatePicker from "@/components/elements/datePicker/datePicker.element";
import { Dayjs } from "dayjs";
import AntMultiSelect from "@/components/elements/multiSelect/multiSelect.element";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ProjectProvider from "@/providers/project .provider";
import AntInput from "@/components/elements/Input/Input.element";
import ProjectService from "@/utils/service/project.service";

interface DataType {
  key: string;
  projectName: string;
  startDate: string;
  estimatedHours: number;
  status: string;
  deadlineDate: string;
  assignedEmployee: string;
  technologyList: string[];
  priority: string;
  client: string;
  profile: string;
}

// const data: DataType[] = [
//   {
//     key: "1",
//     projectName: "Inhouse",
//     client: "Acquaint",
//     startDate: "2011-11-11",
//     deadlineDate: "2011-11-11",
//     assignedEmployee: "A",
//     profile: "Inhouse",
//     status: "IN_PROGRESS",
//     priority: "HIGH",
//     technologyList: ["nodeJs"],
//     estimatedHours: 200,
//   },
//   {
//     key: "2",
//     projectName: "Talking Tom",
//     client: "Gabe",
//     startDate: "2011-11-12",
//     deadlineDate: "2011-11-12",
//     assignedEmployee: "B",
//     profile: "Inhouse",
//     status: "COMPLETED",
//     priority: "LOW",
//     technologyList: ["nodeJs"],
//     estimatedHours: 200,
//   },
//   {
//     key: "3",
//     projectName: "School Managemant",
//     client: "David",
//     startDate: "2011-11-13",
//     deadlineDate: "2011-11-13",
//     assignedEmployee: "C",
//     profile: "Jim",
//     status: "Hold",
//     priority: "HIGH",
//     technologyList: ["nodeJs"],
//     estimatedHours: 200,
//   },
// ];

const Project = () => {
  const [open, setOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(
    initProject as ProjectDTO,
  );
  const [selectedItem, setSelectedItems] = useState<string[]>([]);
  const { CreateProject, UpdateProject } = ProjectService();
  const [isEdit, setEdit] = useState(false);
  const projectList = useSelector(
    (state: RootState) => state.project.projectList,
  );

  const handleEdit = (data: any | SetStateAction<ProjectDTO>) => {
    console.log("hello inhande edit---");
    setSelectedItems(data.technologyList);
    setProjectDetails(data);
    setOpen(true);
    setEdit(true);
  };
  const handleDelete = () => {
    // console.log("Deleted....");
  };
  const columns: ColumnsType<DataType> = [
    {
      title: <span className="text-blue-950">Project Name</span>,
      dataIndex: "projectName",
      key: "projectName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: <span className="text-blue-950">Client</span>,
      dataIndex: "client",
      key: "client",
    },
    {
      title: <span className="text-blue-950">Start Date</span>,
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: <span className="text-blue-950">Deadline</span>,
      dataIndex: "deadlineDate",
      key: "deadlineDate",
    },
    {
      title: <span className="text-blue-950">Assigned Employee</span>,
      dataIndex: "assignedEmployee",
      key: "assignedEmployee",
    },
    {
      title: <span className="text-blue-950">Estimated Hours</span>,
      dataIndex: "estimatedHours",
      key: "estimatedHours",
    },
    {
      title: <span className="text-blue-950">Status</span>,
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        const color =
          status === "HOLD"
            ? "orange"
            : status === "COMPLETED"
            ? "green"
            : "blue";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: <span className="text-blue-950">Profile</span>,
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: <span className="text-blue-950">Action</span>,
      dataIndex: "action",
      key: "action",
      render: (row, rowIndex) => {
        // console.log({ row, rowIndex });

        return (
          <div className="flex gap-5">
            <EditOutlined
              className="hover:text-blue-500"
              onClick={() => handleEdit(rowIndex)}
            />
            <DeleteOutlined
              className="hover:text-red-600"
              onClick={handleDelete}
            />
          </div>
        );
      },
    },
  ];

  const showModal = () => {
    console.log("helo im  here in model---");
    console.log("ths.project detail---", projectDetails);
    setProjectDetails(initProject);
    setOpen(true);
  };
  const handleSave = () => {
    // todo : please add local redux state of perticular list for Create APi.
    // todo : add new object coming in response add into that
    // todo :  and for edit project also get updated project into response add that in to response.
    // todo :  to legendary dhyan

    const _payload = {
      ...projectDetails,
      tecnologyList: selectedItem,
      estimatedHours: Number(projectDetails.estimatedHours),
    };

    if (!isEdit) {
      CreateProject({
        payload: _payload,
        setOpen: setOpen,
      });
    }
    if (isEdit) {
      UpdateProject({
        payload: _payload,
        projectId: projectDetails._id ?? "",
        setOpen: setOpen,
      });
    }
  };
  const handleCancel = () => {
    setProjectDetails(initProject);
    setSelectedItems([]);
    setOpen(false);
    setEdit(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };
  const handleSelect = (e: string, id: string) => {
    console.log({ e, id });

    setProjectDetails({ ...projectDetails, [id]: e });
  };

  const handleDateSelect = (
    date: Dayjs | null,
    dateString: string,
    id: string,
  ) => {
    console.log("hello 000--- handle date select---", projectDetails);

    setProjectDetails({ ...projectDetails, [id]: dateString });
  };

  return (
    <ProjectProvider>
      <div className="flex flex-col justify-center gap-4 p-4">
        <div className="flex justify-end p-4">
          <Button
            type="primary"
            onClick={showModal}
            icon={<PlusOutlined />}
            shape="round"
            size={"large"}
            className="bg-blue-950"
          >
            Create
          </Button>
        </div>
        <AntCard cardTitle="PROJECT SUMMARY">
          <AntTable columns={columns} data={projectList}></AntTable>
        </AntCard>

        <Modal
          open={open}
          title={
            <span className="mb-10 text-blue-950">
              {isEdit ? "Edit Project" : "Create Project"}
            </span>
          }
          onOk={handleSave}
          width={800}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" onClick={handleSave}>
              {isEdit ? "Edit" : "Save"}
            </Button>,
          ]}
        >
          <div className="grid py-4 grid-rows-5 text-blue-950 grid-flow-col gap-2 items-start w-[100%]">
            <AntInput
              name={"projectName"}
              label="Project Name"
              placeHolder={"Enter Your Project Name"}
              value={projectDetails.projectName}
              onChange={handleChange}
            ></AntInput>
            <AntInput
              name={"clientId"}
              label="ClientId"
              placeHolder={"Enter Your Customer Name"}
              value={projectDetails.clientId}
              onChange={handleChange}
            ></AntInput>
            <div className="flex gap-5">
              <AntDatePicker
                name={"startDate"}
                value={
                  projectDetails?.startDate?.length > 0
                    ? projectDetails.startDate
                    : ""
                }
                label="Start Date"
                onChange={(date, dateString) =>
                  handleDateSelect(date, dateString, "startDate")
                }
              ></AntDatePicker>

              <AntDatePicker
                name={"deadlineDate"}
                value={
                  projectDetails?.deadlineDate?.length > 0
                    ? projectDetails.deadlineDate
                    : ""
                }
                label="Deadline date"
                onChange={(date, dateString) =>
                  handleDateSelect(date, dateString, "deadlineDate")
                }
              ></AntDatePicker>
            </div>
            <AntInput
              name={"assignedEmployee"}
              label="Assigned employee"
              placeHolder={"Enter AssigneeS"}
              value={projectDetails.assignedEmployee}
              onChange={handleChange}
            ></AntInput>
            <AntInput
              name={"estimatedHours"}
              label="Estimated Hours"
              placeHolder={"Enter Estimated Hours"}
              value={projectDetails.estimatedHours?.toString()}
              onChange={handleChange}
            ></AntInput>
            <AntSelect
              id="status"
              options={ProjectStatus}
              label={"Status"}
              placeHolder={"Select"}
              onChange={(e) => handleSelect(e, "status")}
              value={projectDetails.status}
            ></AntSelect>
            <AntInput
              name={"profile"}
              label="Profile"
              placeHolder={"Enter Your Profile Name"}
              value={projectDetails.profile}
              onChange={handleChange}
            ></AntInput>
            <AntMultiSelect
              width={330}
              value={projectDetails.technologyList}
              label="Technology"
              placeHolder="Select Technology"
              options={technologyConstant}
              selectedItems={selectedItem}
              setSelectedItems={setSelectedItems}
            ></AntMultiSelect>
            <AntSelect
              options={ProjectPriority}
              label={"Priority"}
              placeHolder={"Select"}
              onChange={(e) => handleSelect(e, "priority")}
              value={projectDetails.priority}
              id={"priority"}
            ></AntSelect>
          </div>
        </Modal>
      </div>
    </ProjectProvider>
  );
};

export default Project;
