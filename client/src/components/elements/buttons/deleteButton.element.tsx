import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type DeleteButtonProps = {
  loading: boolean;
  onDelete: (e: any) => void;
  rowData: any;
};

const DeleteButton = ({ loading, onDelete, rowData }: DeleteButtonProps) => {
  return (
    <Popconfirm
      title="Delete the client"
      description="Are you sure to delete this client?"
      onConfirm={() => {
        onDelete(rowData);
      }}
      okText="Yes"
      cancelText="No"
      okButtonProps={{
        className: "bg-blue-950",
        loading: loading,
      }}
      cancelButtonProps={{ danger: true, type: "primary" }}
    >
      <DeleteOutlined
        onClick={(e) => e.stopPropagation()}
        className="hover:text-red-600"
      />
    </Popconfirm>
  );
};

export default DeleteButton;
