import AntInput from "@/components/elements/Input/Input.element";
import AntCard from "@/components/elements/card/card.element";
import AntSelect from "@/components/elements/select/select.element";
import AntTable from "@/components/elements/table/table.element";
import { UserRole } from "@/constants/user.constant";
import { RootState } from "@/store/store";
import { UserDTO } from "@/types/auth.types";
import { errorToastHelper } from "@/utils/helper/toast.helper";
import UserService from "@/utils/service/user.service";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_ROLES } from "@/constants/user.constant";
import { USER_ERROR } from "@/utils/error/messages";

const User = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [userDetails, setUserDetails] = useState({} as UserDTO);
  const stateData = useSelector((state: RootState) => state);
  const userList = useSelector((state: RootState) => state.user.userList);
  const dispatch = useDispatch();
  const { createUser, deleteUser, updateUser } = UserService();
  const columns: ColumnsType<UserDTO> = [
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
      title: <span className="text-blue-950">Designation</span>,
      key: "designation",
      dataIndex: "designation",
    },

    {
      title: <span className="text-blue-950">Role</span>,
      dataIndex: "role",
      key: "role",
    },
    {
      title: <span className="text-blue-950">Action</span>,
      dataIndex: "action",
      key: "action",
      render: (_, rowData) => {
        return (
          <div className="flex gap-5">
            <EditOutlined
              className="hover:text-blue-500"
              onClick={() => onEdit(rowData)}
            />

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                onDelete(rowData);
              }}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-blue-950", loading: loading }}
              cancelButtonProps={{ danger: true, type: "primary" }}
            >
              <DeleteOutlined className="hover:text-red-600" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const showModal = () => {
    setOpen(true);
  };
  const onEdit = (data: UserDTO) => {
    setUserDetails(data);
    setOpen(true);
    setEdit(true);
  };
  const onDelete = (data: UserDTO) => {
    // for now considering the key that you ca
    if (data.role === USER_ROLES.MANAGER && data.clients?.length)
      return errorToastHelper(USER_ERROR.managerValidationError);
    if (!data._id) return errorToastHelper(USER_ERROR.deleteUserError);
    deleteUser({
      userId: data?._id ?? "",
      setLoading,
      dispatch,
    });
  };
  const handleCancel = () => {
    setOpen(false);
    setEdit(false);
  };
  const onSubmit = () => {
    if (!isEdit) {
      createUser({
        payload: userDetails,
        setOpen: setOpen,
        dispatch,
        setLoading,
      });
    }
    if (isEdit) {
      updateUser({
        payload: userDetails,
        setIsEdit: setEdit,
        setOpen: setOpen,
        dispatch,
        setLoading,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    setUserDetails({ ...userDetails, [id]: e });
  };

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <AntCard
        cardTitle={
          <div className="flex w-full items-center justify-between p-4">
            <span className="text-xl">User Summary</span>
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
        }
      >
        <AntTable columns={columns} data={userList}></AntTable>
      </AntCard>
      <Modal
        open={open}
        title={
          <span className="mb-10 text-blue-950">
            {isEdit ? "Edit Task" : "Create Task"}
          </span>
        }
        onOk={onSubmit}
        width={800}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-950", loading: loading }}
        okText={isEdit ? "Update" : "Save"}
        cancelButtonProps={{ danger: true, type: "primary" }}
      >
        <div className="grid py-4 grid-rows-2 text-blue-950 grid-flow-col gap-16 items-start w-[100%]">
          <AntInput
            name={"name"}
            value={userDetails.name}
            label={"Name"}
            placeHolder={"Enter Your Name"}
            onChange={handleChange}
            disabled={loading ? true : false}
          />
          <AntInput
            name={"email"}
            value={userDetails.email}
            label={"Email"}
            placeHolder={"Enter Your Email"}
            onChange={handleChange}
            disabled={loading ? true : false}
          />
          <AntSelect
            options={UserRole}
            label={"Role"}
            placeHolder={"Select"}
            onChange={(e) => handleSelect(e, "role")}
            id={"role"}
            disabled={loading ? true : false}
          ></AntSelect>
          <AntInput
            name={"designation"}
            value={userDetails.designation}
            label={"Designation"}
            placeHolder={"Enter Your Designation"}
            onChange={handleChange}
            disabled={loading ? true : false}
          />
        </div>
      </Modal>
    </div>
  );
};

export default User;
