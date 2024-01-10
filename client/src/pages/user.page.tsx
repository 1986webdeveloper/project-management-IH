import AntInput from "@/components/elements/Input/Input.element";
import AntCard from "@/components/elements/card/card.element";
import AntSelect from "@/components/elements/select/select.element";
import AntTable from "@/components/elements/table/table.element";
import { DepartmentsList, UserRole } from "@/constants/user.constant";
import { UserDTO } from "@/types/auth.types";
import { errorToastHelper } from "@/utils/helper/toast.helper";
import UserService from "@/utils/service/user.service";

import { Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { USER_ROLES } from "@/constants/user.constant";
import { USER_ERROR } from "@/utils/error/messages";
import DeleteButton from "@/components/elements/buttons/deleteButton.element";
import EditButton from "@/components/elements/buttons/editButton.element";
import CreateButton from "@/components/elements/buttons/createButton.element";
import AntDatePicker from "@/components/elements/datePicker/datePicker.element";
import { Dayjs } from "dayjs";
import { ImageUpload } from "@/components/shared/imageUpload/imageUploader.shared";
import { userInputValidation } from "@/utils/helper/validation.helper";
import { initUser } from "@/constants/general.constants";

interface userProps {
  userList: UserDTO[];
}

const User = ({ userList }: userProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [userDetails, setUserDetails] = useState(initUser);
  const [error, setError] = useState({
    name: "",
    email: "",
    designation: "",
    date_of_birth: "",
    department: "",
    role: "",
  });
  const dispatch = useDispatch();
  const { CreateUser, DeleteUser, UpdateUser } = UserService({
    dispatch,
    setLoading,
  });
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

  // *handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setError({} as any);
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    setError({} as any);
    setUserDetails({ ...userDetails, [id]: e });
  };
  const handleDateSelect = (
    date: Dayjs | null,
    dateString: string,
    id: string,
  ) => {
    setUserDetails({ ...userDetails, [id]: dateString });
  };
  // *modal actions
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setError({} as any);
    setUserDetails(initUser);
    setOpen(false);
    setEdit(false);
  };
  // *FormActions
  const onEdit = (data: UserDTO) => {
    console.log("9999");

    setUserDetails(data);
    setOpen(true);
    setEdit(true);
  };
  const onDelete = (data: UserDTO) => {
    // for now considering the key that you ca
    if (data.role === USER_ROLES.MANAGER && data.clients?.length)
      return errorToastHelper(USER_ERROR.managerValidationError);
    if (!data._id) return errorToastHelper(USER_ERROR.deleteUserError);
    DeleteUser({
      userId: data?._id ?? "",
    });
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    const isValid = userInputValidation(userDetails, setError);

    if (isValid) {
      setUserDetails({ ...userDetails, profile_Picture: imgURL });
      if (!isEdit) {
        CreateUser({
          payload: userDetails,
          setOpen: setOpen,
        });
      }
      if (isEdit) {
        console.log("6666");

        UpdateUser({
          payload: userDetails,
          setIsEdit: setEdit,
          setOpen: setOpen,
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <AntCard
        cardTitle={
          <div className="flex w-full items-center justify-between p-4">
            <span className="text-xl">User Summary</span>
            <CreateButton onCreate={showModal} />
          </div>
        }
      >
        <AntTable columns={columns} data={userList} />
      </AntCard>
      <Modal
        open={open}
        title={
          <span className="mb-10 text-blue-950">
            {isEdit ? "Edit User" : "Create User"}
          </span>
        }
        onOk={onSubmit}
        width={800}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-950", loading: loading }}
        okText={isEdit ? "Update" : "Save"}
        cancelButtonProps={{ danger: true, type: "primary" }}
      >
        <div className="grid py-4 grid-rows-4 text-blue-950 grid-flow-col gap-4 items-start w-[100%]">
          <AntInput
            name={"name"}
            value={userDetails.name}
            label={"Name"}
            placeHolder={"Enter Your Name"}
            onChange={handleChange}
            disabled={loading ? true : false}
            error={error.name}
          />
          <AntInput
            name={"email"}
            value={userDetails.email}
            label={"Email"}
            placeHolder={"Enter Your Email"}
            onChange={handleChange}
            disabled={loading ? true : false}
            error={error.email}
          />
          <AntInput
            name={"designation"}
            value={userDetails.designation}
            label={"Designation"}
            placeHolder={"Enter Your Designation"}
            onChange={handleChange}
            disabled={loading ? true : false}
            error={error.designation}
          />
          <AntSelect
            id={"department"}
            options={DepartmentsList}
            label={"Department"}
            placeHolder={"Select"}
            onChange={(e) => handleSelect(e, "department")}
            disabled={loading ? true : false}
            value={userDetails.department}
            error={error.department}
          ></AntSelect>
          {/* <div> */}
          <ImageUpload
            className="flex w-full items-center justify-center"
            setImgURL={setImgURL}
            imgURL={imgURL}
            // setError={}
          />
          {/* </div> */}
          <AntDatePicker
            name={"date_of_birth"}
            value={
              userDetails?.date_of_birth?.length > 0
                ? userDetails.date_of_birth
                : ""
            }
            label="Date of Birth"
            onChange={(date, dateString) =>
              handleDateSelect(date, dateString, "date_of_birth")
            }
            width="300px"
            transformStyle="translate(1%, 176%)"
            error={error.date_of_birth}
          />
          <AntSelect
            id={"role"}
            options={UserRole}
            label={"Role"}
            placeHolder={"Select"}
            onChange={(e) => handleSelect(e, "role")}
            disabled={loading ? true : false}
            value={userDetails.role}
            error={error.role}
          ></AntSelect>
        </div>
      </Modal>
    </div>
  );
};

export default User;
