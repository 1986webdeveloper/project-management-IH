import DeleteButton from "@/components/elements/buttons/deleteButton.element";
import EditButton from "@/components/elements/buttons/editButton.element";
import ViewButton from "@/components/elements/buttons/viewButton.element";
import AntTable from "@/components/elements/table/table.element";
import { USER_STATUS_ENUM } from "@/constants/user.constant";
import { UserDTO } from "@/types/auth.types";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";

type Props = {
  userList: UserDTO[];
  onEdit: (e: UserDTO) => void;
  onDelete: (e: UserDTO) => void;
  onView: (e: any) => void;
  loading: boolean;
};

const UserTable = ({ userList, onDelete, onEdit, loading, onView }: Props) => {
  const columns: ColumnsType<UserDTO> = [
    // {
    //   title: <span className="text-blue-950">View</span>,
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_, rowData) => {
    //     return (
    //       <div className="flex gap-5">
    //         <ViewButton onClick={onView} rowData={rowData} />
    //       </div>
    //     );
    //   },
    // },
    {
      title: <span className="text-blue-950">Name</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span className="text-blue-950">Email</span>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <span className="text-blue-950">Role</span>,
      dataIndex: "role",
      key: "role",
    },
    {
      title: <span className="text-blue-950">Designation</span>,
      key: "designation",
      dataIndex: "designation",
    },
    {
      title: <span className="text-blue-950">User Status</span>,
      key: "priority",
      dataIndex: "priority",
      render: (_, { userStatus }) => {
        const color =
          userStatus === USER_STATUS_ENUM.ACTIVE
            ? "green"
            : userStatus === USER_STATUS_ENUM.INACTIVE
            ? "red"
            : "grey";
        return <Tag color={color}>{userStatus.toUpperCase()}</Tag>;
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
      data={userList.map((user, index) => ({ ...user, key: index }))}
    />
  );
};

export default UserTable;
