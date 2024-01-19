import DeleteButton from "@/components/elements/buttons/deleteButton.element";
import EditButton from "@/components/elements/buttons/editButton.element";
import AntTable from "@/components/elements/table/table.element";
import { PRIORITY_ENUM, STATUS_ENUM } from "@/constants/general.constants";
import { TaskDTO } from "@/types/fieldTypes";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";

type Props = {
  taskList: TaskDTO[];
  onEdit: (e: TaskDTO) => void;
  onDelete: (e: TaskDTO) => void;
  loading: boolean;
};

const TaskTable = ({ taskList, onDelete, onEdit, loading }: Props) => {
  const columns: ColumnsType<TaskDTO> = [
    {
      title: <span className="text-blue-950">Title</span>,
      dataIndex: "title",
      key: "title",
    },
    {
      title: <span className="text-blue-950">Reporting Manager</span>,
      dataIndex: "reportingManager",
      key: "reportingManager",
      render: (text) => {
        return (
          <a>
            {text?.name}
            {/* {roleHelper(USER_ROLES.MANAGER).keyLabelValuePair[text]?.label}{" "} */}
          </a>
        );
      },
    },
    {
      title: <span className="text-blue-950">Project Name</span>,
      dataIndex: "projectId",
      key: "projectId",
      render: (projectData) => {
        return <a>{projectData.projectName}</a>;
      },
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
      data={taskList.map((task, index) => ({ ...task, key: index }))}
    />
  );
};

export default TaskTable;
