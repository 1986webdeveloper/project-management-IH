import AntCard from "@/components/elements/card/card.element";
import { UserDTO } from "@/types/auth.types";
import { errorToastHelper } from "@/utils/helper/toast.helper";
import UserService from "@/utils/service/user.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { USER_ROLES } from "@/constants/user.constant";
import { USER_ERROR } from "@/utils/error/messages";
import CreateButton from "@/components/elements/buttons/createButton.element";
import { userInputValidation } from "@/utils/helper/validation.helper";
import { initUser } from "@/constants/general.constants";
import { DEFAULT_USER_URL } from "@/config/keys.config";
import UserForm from "@/components/shared/forms/user.form";
import UserTable from "@/components/shared/tables/user.table";
import FormModal from "@/components/shared/modals/form.modal";
import ViewModal from "@/components/shared/modals/view.modal";

interface userProps {
  userList: UserDTO[];
}

const User = ({ userList }: userProps) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [userDetails, setUserDetails] = useState(initUser);
  const [fieldName, setFieldName] = useState("");
  const [selectedRow, setSelectedRow] = useState({} as UserDTO);
  const [error, setError] = useState({
    name: "",
    email: "",
    designation: "",
    date_of_birth: "",
    department: "",
    role: "",
    userStatus: "",
  });
  const dispatch = useDispatch();
  const { CreateUser, DeleteUser, UpdateUser } = UserService({
    dispatch,
    setLoading,
  });
  useEffect(() => {
    setUserDetails({
      ...userDetails,
      profile_Picture: imgURL ? imgURL : DEFAULT_USER_URL,
    });
  }, []);

  // *modal actions
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setImgURL("");
    setError({} as any);
    setFieldName("");
    setUserDetails(initUser);
    setOpen(false);
    setView(false);
    setEdit(false);
  };

  // *FormActions
  const onEdit = (data: UserDTO) => {
    if (data.profile_Picture) {
      setImgURL(data.profile_Picture);
    }
    setUserDetails(data);
    setOpen(true);
    setEdit(true);
  };
  const handalRowClick = (data: any) => {
    setSelectedRow(data);
    setView(true);
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
    const { errors } = userInputValidation(userDetails, setError);

    if (!Object.values(errors).some((value) => value)) {
      if (!isEdit) {
        CreateUser({
          payload: {
            ...userDetails,
            profile_Picture: imgURL,
          },
          setOpen: setOpen,
        });
        setError({} as any);
      }
      if (isEdit) {
        UpdateUser({
          payload: { ...userDetails, profile_Picture: imgURL },
          setIsEdit: setEdit,
          setOpen: setOpen,
        });
        setError({} as any);
      }
    } else {
      errorToastHelper("Please fill the details properly.");
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
        <UserTable
          userList={userList}
          onEdit={onEdit}
          handalRowClick={handalRowClick}
          onDelete={onDelete}
          loading={loading}
        />
      </AntCard>

      <FormModal
        open={open}
        onSubmit={onSubmit}
        handleCancel={handleCancel}
        loading={loading}
        error={error}
        checkObject={userDetails}
        title={isEdit ? "Edit User" : "Create User"}
        SubmitButtonText={isEdit ? "Update" : "Save"}
      >
        <UserForm
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          imgURL={imgURL}
          setImgURL={setImgURL}
          error={error}
          setError={setError}
          setFieldName={setFieldName}
          loading={loading}
          fieldName={fieldName}
        />
      </FormModal>
      <ViewModal
        open={view}
        onSubmit={onSubmit}
        handleCancel={handleCancel}
        loading={loading}
        error={error}
        checkObject={userDetails}
        title={"User Details"}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default User;
