import { ChangeEvent } from "react";
import { ImageUpload } from "../imageUpload/imageUploader.shared";
import AntInput from "@/components/elements/Input/Input.element";
import AntMultiSelect from "@/components/elements/multiSelect/multiSelect.element";
import AntDatePicker from "@/components/elements/datePicker/datePicker.element";
import { ClientDTO } from "@/types/fieldTypes";
import { UserDTO } from "@/types/auth.types";
import { useDispatch } from "react-redux";
import useList from "@/utils/helper/array.helper";
import { USER_ROLES } from "@/constants/user.constant";
import UserService from "@/utils/service/user.service";
import { Dayjs } from "dayjs";

interface ClientProps {
  clientDetails: ClientDTO;
  setClientDetails: (e: ClientDTO) => void;
  imgURL: string;
  setImgURL: (e: string) => void;
  error: any;
  setError: (e: any) => void;
  fieldName: string;
  setFieldName: (e: string) => void;
  loading: boolean;
  isEdit: boolean;
  managerList: UserDTO[];
  setLoading: (e: boolean) => void;
}

const ClientForm = ({
  clientDetails,
  setClientDetails,
  imgURL,
  setImgURL,
  error,
  setError,
  setFieldName,
  isEdit,
  managerList,
  setLoading,
}: ClientProps) => {
  const { ModuleList } = useList();
  const dispatch = useDispatch();
  const { GetUserList } = UserService({
    dispatch,
    setLoading,
  });
  // *handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldName(name);
    setError({ ...error, [name]: "" });
    setClientDetails({ ...clientDetails, [name]: value });
  };
  const handleMultiSelect = (e: any, name: string) => {
    setFieldName(name);
    setError({ ...error, [name]: "" });
    setClientDetails({ ...clientDetails, [name]: [...e] });
  };
  const handleDateSelect = (
    date: Dayjs | null,
    dateString: string,
    id: string,
  ) => {
    setFieldName(id);
    setError({ ...error, [id]: "" });
    setClientDetails({ ...clientDetails, [id]: dateString });
  };
  console.log(clientDetails, "clientDetails");

  return (
    <div>
      <div>
        <ImageUpload
          className="flex w-full items-center justify-center"
          setImgURL={setImgURL}
          imgURL={imgURL}
        />
      </div>
      <div className="grid py-7 grid-rows-3 text-blue-950 grid-flow-col items-start w-[100%]">
        <AntInput
          name={"clientName"}
          label="Client Name"
          placeHolder={"Enter Your Client Name"}
          value={clientDetails.clientName}
          onChange={handleChange}
          onFocus={() => setFieldName("clientName")}
          error={error.clientName}
        />
        <AntInput
          name={"industry"}
          label="Industry"
          placeHolder={"Enter Your expertise field"}
          value={clientDetails.industry}
          onChange={handleChange}
          onFocus={() => setFieldName("industry")}
          error={error.industry}
        />
        <AntMultiSelect
          width={330}
          value={
            isEdit
              ? ModuleList(clientDetails.managerList, "name")
              : clientDetails.managerList
          }
          label="Managers"
          placeHolder="Select manager"
          options={ModuleList(managerList, "name")}
          onChange={(e) => {
            handleMultiSelect(e, "managerList");
          }}
          onFocus={() => {
            setFieldName("managerList");
            return GetUserList({ role: USER_ROLES.MANAGER });
          }}
          optionLabel={"label"}
          error={error.managerList}
        />
        <AntInput
          name={"email"}
          label="Email"
          placeHolder={"Enter your email"}
          value={clientDetails.email}
          onChange={handleChange}
          error={error.email}
        />
        <AntDatePicker
          name={"onBoardingDate"}
          width="330px"
          value={
            clientDetails?.onBoardingDate?.length > 0
              ? clientDetails?.onBoardingDate
              : ""
          }
          label="Onboarding Date"
          onChange={(date, dateString) =>
            handleDateSelect(date, dateString, "onBoardingDate")
          }
          transformStyle="translate(1%, 170%)"
          applyAgeValidation={false}
          onFocus={() => setFieldName("onBoardingDate")}
          error={error.onBoardingDate}
        />
      </div>
    </div>
  );
};

export default ClientForm;

{
  /* <Modal
        open={open}
        title={
          <span className="mb-10 text-blue-950">
            {isEdit ? "Edit Project" : "Create Client"}
          </span>
        }
        onOk={onSubmit}
        width={800}
        onCancel={handleCancel}
        okButtonProps={{
          className: "bg-blue-950",
          loading: loading,
          //   disabled:
          //     Object.values(error).some((value) => value) ||
          //     !Object.values(clientDetails).every((value) => value),
        }}
        okText={isEdit ? "Update" : "Save"}
        cancelButtonProps={{ danger: true, type: "primary" }}
      > */
}
{
  /* </Modal> */
}
