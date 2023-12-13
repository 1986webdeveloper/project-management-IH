/* eslint-disable @typescript-eslint/no-explicit-any */
import AntInput from "@/components/elements/Input/Input.element";
import { ROUTES } from "@/constants/routes.constants";
import { UserLogInDTO } from "@/types/auth.types";
import { validationHelper } from "@/utils/helper/validation.helper";
import AuthServices from "@/utils/service/auth.service";
import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [userLogin, setUserLogin] = useState({} as UserLogInDTO);
  const { LoginServices } = AuthServices();
  const dispatch = useDispatch();

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
    setError({ email: "", password: "" });
  };

  const onSubmit = (e: any) => {
    console.log(userLogin);
    e.preventDefault();
    const isValid = validationHelper(userLogin, setError);

    if (isValid) {
      LoginServices({
        payload: userLogin,
        dispatch: dispatch,
      });
    }
  };

  return (
    <>
      <div className="font-bold font-mono text-blue-950 tracking-widest text-3xl">
        LOGIN
      </div>

      <div className="flex flex-col gap-9  text-blue-950 items-center justify-center w-[100%]">
        <AntInput
          name="email"
          value={userLogin.email}
          label="Email"
          placeHolder={"Enter Your Email"}
          error={error.email}
          onChange={handleChange}
          // disabled={isLoading ? true : false}
        ></AntInput>
        <AntInput
          name="password"
          type="password"
          value={userLogin.password}
          label={"Password"}
          placeHolder={"Enter Your Password"}
          error={error.password}
          isPassword
          onChange={handleChange}
        ></AntInput>
        <Button
          type="primary"
          onClick={onSubmit}
          className="bg-blue-950 w-full"
        >
          Login
        </Button>
      </div>

      <div className="flex justify-between">
        <p className="mt-6 text-xs text-blue-600 text-center">
          Don't have an account ?
          <NavLink
            to="/register"
            className="border-b border-gray-500 border-dotted"
          >
            {" "}
            SignUp
          </NavLink>
        </p>
        <NavLink
          to={ROUTES.FORGOT_PASSWORD}
          state={{ title: "forgot" }}
          className=" mt-6 text-xs text-blue-600 text-center border-b border-gray-500 border-dotted"
        >
          {" "}
          Forgot Password
        </NavLink>
      </div>
    </>
  );
}
