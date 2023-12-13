import AntInput from "@/components/elements/Input/Input.element";
import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import { UserRole } from "@/constants/user.constant";
import AntSelect from "@/components/elements/select/select.element";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { UserDTO } from "@/types/auth.types";
import AuthServices from "@/utils/service/auth.service";

export default function Register() {
  const [userDetails, setUserDetails] = useState({} as UserDTO);
  const { SignUpService } = AuthServices();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    setUserDetails({ ...userDetails, [id]: e });
  };

  const onSubmit = () => {
    console.log(userDetails);
    SignUpService({ payload: userDetails });
  };

  return (
    <>
      <div className="font-bold font-mono text-blue-950 tracking-widest text-3xl">
        SIGN-UP
      </div>
      <div className="flex  text-blue-950 flex-col gap-8 items-center justify-center w-[100%]">
        <AntInput
          name={"name"}
          value={userDetails.name}
          label={"Name"}
          placeHolder={"Enter Your Name"}
          onChange={handleChange}
        ></AntInput>
        <AntInput
          name={"email"}
          value={userDetails.email}
          label={"Email"}
          placeHolder={"Enter Your Email"}
          onChange={handleChange}
        ></AntInput>
        <AntInput
          name={"password"}
          value={userDetails.password}
          label={"Password"}
          placeHolder={"Enter Your Password"}
          isPassword
          type="password"
          onChange={handleChange}
        ></AntInput>
        <AntSelect
          options={UserRole}
          label={"Role"}
          placeHolder={"Select"}
          onChange={(e) => handleSelect(e, "role")}
        ></AntSelect>
        <AntInput
          name={"designation"}
          value={userDetails.designation}
          label={"Designation"}
          placeHolder={"Enter Your Designation"}
          onChange={handleChange}
        ></AntInput>

        <Button
          type="primary"
          onClick={onSubmit}
          className="bg-blue-950 w-full"
        >
          Save
        </Button>
      </div>
      <div>
        <p className="mt-6 text-xs text-blue-600 text-center">
          Already have an account ?
          <NavLink
            to={ROUTES.HOME}
            className="border-b border-gray-500 border-dotted"
          >
            {" "}
            Login
          </NavLink>
        </p>
      </div>
    </>
  );
}
