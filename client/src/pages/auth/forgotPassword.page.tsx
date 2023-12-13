import AntInput from "@/components/elements/Input/Input.element";
import { ROUTES } from "@/constants/routes.constants";
import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = () => {
    console.log(email);
  };
  return (
    <>
      <div className="font-bold font-mono text-blue-950 tracking-widest text-2xl">
        FORGOT PASSWORD..?
      </div>

      <div className="flex flex-col gap-2  text-blue-950 items-center justify-center w-[100%]">
        <AntInput
          name="email"
          value={email}
          label="Email"
          placeHolder={"Enter Your Email"}
          onChange={handleChange}
        ></AntInput>
        <Button
          type="primary"
          onClick={onSubmit}
          className="bg-blue-950 w-full mt-12"
        >
          Send me a password
        </Button>
        <Button
          type="dashed"
          danger
          onClick={() => {
            navigate(ROUTES.LOGIN);
          }}
          className=" hover:bg-red-100 w-full"
        >
          Do it later
        </Button>
      </div>
    </>
  );
};

export default ForgotPassword;
