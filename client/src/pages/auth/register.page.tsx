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
  const [loading, setLoading] = useState(false);
  const { SignUpService } = AuthServices({ setLoading });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    setUserDetails({ ...userDetails, [id]: e });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    SignUpService({ payload: userDetails });
  };

  return (
    <>
      <div className="font-bold mb-6 font-mono text-blue-950 tracking-widest text-3xl">
        SIGN-UP
      </div>
      <form
        onSubmit={onSubmit}
        className="flex  text-blue-950 flex-col gap-8 items-center justify-center w-[100%]"
      >
        <AntInput
          name={"name"}
          value={userDetails.name}
          label={"Name"}
          placeHolder={"Enter Your Name"}
          onChange={handleChange}
          disabled={loading ? true : false}
        ></AntInput>
        <AntInput
          name={"email"}
          value={userDetails.email}
          label={"Email"}
          placeHolder={"Enter Your Email"}
          onChange={handleChange}
          disabled={loading ? true : false}
        ></AntInput>
        <AntInput
          name={"password"}
          value={userDetails.password ?? ""}
          label={"Password"}
          placeHolder={"Enter Your Password"}
          isPassword
          type="password"
          onChange={handleChange}
          disabled={loading ? true : false}
        ></AntInput>
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
        ></AntInput>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={onSubmit}
          className="bg-blue-950 w-full"
        >
          Save
        </Button>
      </form>
      <div>
        <p className="mt-6 text-xs text-blue-600 text-center">
          <NavLink
            to={ROUTES.LOGIN}
            className="border-b border-gray-500 border-dotted"
          >
            Already have an account ? Login
          </NavLink>
        </p>
      </div>
    </>
  );
}
