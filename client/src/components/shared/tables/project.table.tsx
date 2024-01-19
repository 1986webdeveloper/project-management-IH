import DeleteButton from "@/components/elements/buttons/deleteButton.element";
import EditButton from "@/components/elements/buttons/editButton.element";
import AntTable from "@/components/elements/table/table.element";
import { PRIORITY_ENUM, STATUS_ENUM } from "@/constants/general.constants";
import { ProjectDTO } from "@/types/fieldTypes";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";

type Props = {
  projectList: ProjectDTO[];
  onEdit: (e: ProjectDTO) => void;
  onDelete: (e: ProjectDTO) => void;
  loading: boolean;
};

const ProjectTable = ({ projectList, onDelete, onEdit, loading }: Props) => {
  const columns: ColumnsType<ProjectDTO> = [
    {
      title: <span className="text-blue-950">Project Name</span>,
      dataIndex: "projectName",
      key: "projectName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: <span className="text-blue-950">Client</span>,
      dataIndex: "clientId",
      key: "clientId",
      render: (text) => {
        return <a>{text.clientName}</a>;
        // return <a>{ModuleList(clientList, 'clientName').keyLabelValuePair[text]?.label}</a>;
      },
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
      title: <span className="text-blue-950">Estimated Hours</span>,
      dataIndex: "estimatedHours",
      key: "estimatedHours",
    },

    {
      title: <span className="text-blue-950">Priority</span>,
      key: "priority",
      dataIndex: "priority",
      render: (_, { priority }) => {
        const color =
          priority === PRIORITY_ENUM.HIGH
            ? "red"
            : priority === PRIORITY_ENUM.LOW
            ? "skyblue"
            : "orange";
        return <Tag color={color}>{priority.toUpperCase()}</Tag>;
      },
    },

    {
      title: <span className="text-blue-950">Status</span>,
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        const color =
          status === STATUS_ENUM.HOLD
            ? "grey"
            : status === STATUS_ENUM.COMPLETED
            ? "green"
            : "blue";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: <span className="text-blue-950">Action</span>,
      dataIndex: "action",
      key: "action",
      render: (_, rowData) => {
        return (
          <div className="flex gap-5">
            <EditButton onClick={onEdit} rowData={rowData} />
            <DeleteButton
              loading={loading}
              onDelete={onDelete}
              rowData={rowData}
            />
          </div>
        );
      },
    },
  ];
  return (
    <AntTable
      columns={columns}
      data={projectList.map((project, index) => ({ ...project, key: index }))}
    />
  );
};

export default ProjectTable;
