import AntInput from "@/components/elements/Input/Input.element";
import AntDatePicker from "@/components/elements/datePicker/datePicker.element";
import AntSelect from "@/components/elements/select/select.element";
import { userStatusList, UserRole } from "@/constants/user.constant";
import {
  departmentHelper,
  designationHelper,
} from "@/utils/helper/generel.helper";
import dayjs, { Dayjs } from "dayjs";
import { ImageUpload } from "../imageUpload/imageUploader.shared";
import { UserDTO } from "@/types/auth.types";
import { ChangeEvent } from "react";

type UserFormProps = {
  userDetails: UserDTO;
  setUserDetails: (e: UserDTO) => void;
  imgURL: string;
  setImgURL: (e: string) => void;
  error: any;
  setError: (e: any) => void;
  setFieldName: (e: string) => void;
  loading: boolean;
  fieldName: string;
};

const UserForm = ({
  userDetails,
  error,
  imgURL,
  setFieldName,
  setImgURL,
  setUserDetails,
  fieldName,
  loading,
  setError,
}: UserFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFieldName(name);
    setError({ ...error, [name]: "" });
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSelect = (e: any, id: string) => {
    setFieldName(id);
    setError({ ...error, [id]: "" });
    if (id === "role") {
      setUserDetails({
        ...userDetails,
        role: e,
        department: "",
        designation: "",
      });
    } else if (id === "department") {
      setUserDetails({ ...userDetails, department: e, designation: "" });
    } else {
      setUserDetails({ ...userDetails, [id]: e });
    }
  };

  const handleDateSelect = (
    date: Dayjs | null,
    dateString: string,
    id: string,
  ) => {
    setFieldName(id);
    setError({ ...error, [id]: "" });
    setUserDetails({ ...userDetails, [id]: dateString });
  };

  return (
    <div>
      <div>
        <ImageUpload
          className="flex w-full items-center justify-center"
          setImgURL={setImgURL}
          imgURL={imgURL}
        />
      </div>
      <div className="grid py-4 grid-rows-4 text-blue-950 grid-flow-col gap-10 gap-x-24 items-start w-[100%]">
        <AntInput
          name={"name"}
          value={userDetails.name}
          label={"Name"}
          placeHolder={"Enter Your Name"}
          onChange={handleChange}
          disabled={loading ? true : false}
          error={error.name}
          onFocus={() => setFieldName("name")}
        />

        <AntInput
          name={"email"}
          value={userDetails.email}
          label={"Email"}
          placeHolder={"Enter Your email"}
          onChange={handleChange}
          disabled={loading ? true : false}
          error={error.email}
          onFocus={() => setFieldName("email")}
        />
        <AntSelect
          id={"UserStatus"}
          options={userStatusList}
          label={"User Status"}
          placeHolder={"Select"}
          onChange={(e) => handleSelect(e, "userStatus")}
          disabled={loading ? true : false}
          value={userDetails.userStatus}
          error={error.userStatus}
          onFocus={() => setFieldName("userStatus")}
        />
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
          width="330px"
          transformStyle="translate(1%, 176%)"
          applyAgeValidation
          info={true}
          defaultValue={dayjs().subtract(15, "years")}
          error={error.date_of_birth}
          onFocus={() => setFieldName("date_of_birth")}
        />
        <AntSelect
          id={"role"}
          options={UserRole}
          label={"Role"}
          placeHolder={"Select"}
          onChange={(e) => handleSelect(e, "role")}
          onFocus={() => setFieldName("role")}
          disabled={loading ? true : false}
          value={userDetails.role}
          error={error.role}
        />
        <AntSelect
          id={"department"}
          options={departmentHelper(userDetails.role)}
          label={"Department"}
          placeHolder={"Select"}
          onChange={(e) => handleSelect(e, "department")}
          disabled={loading ? true : false}
          value={userDetails.department}
          error={error.department}
          onFocus={() => setFieldName("department")}
        />

        <AntSelect
          id={"designation"}
          value={userDetails.designation}
          label={"Designation"}
          placeHolder={"Enter Your Designation"}
          onChange={(e) => handleSelect(e, "designation")}
          onFocus={() => setFieldName("designation")}
          disabled={loading ? true : false}
          error={error.designation}
          options={designationHelper(userDetails.department)}
        />
      </div>
    </div>
  );
};

export default UserForm;
