import AntInput from "@/components/elements/Input/Input.element";
import { ResetPassDTO } from "@/types/auth.types";
import { Button } from "antd";
import { ChangeEvent, useState } from "react";

const ResetPassword = () => {
  const [resetPass, setResetPass] = useState({} as ResetPassDTO);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPass({ ...resetPass, [name]: value });
  };
  const onSubmit = () => {};

  return (
    <>
      <div className="font-bold font-sans text-blue-950 tracking-widest text-3xl">
        RESET PASSWORD
      </div>

      <div className="flex flex-col gap-9  text-blue-950 items-center justify-center w-[100%]">
        <AntInput
          name="oldPassword"
          type="password"
          value={resetPass.oldPassword}
          label={"Old password"}
          placeHolder={"Enter your old password"}
          onChange={handleChange}
        ></AntInput>
        <AntInput
          name="newPassword"
          type="password"
          value={resetPass.newPassword}
          label={"New password"}
          placeHolder={"Enter your new password"}
          onChange={handleChange}
        ></AntInput>
        <Button
          type="primary"
          onClick={onSubmit}
          className="bg-blue-950 w-full"
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default ResetPassword;
