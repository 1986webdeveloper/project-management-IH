import { ChangeEvent, useEffect, useState } from "react";
import AntInput from "./Input.element";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { API_LIST } from "@/config/api.config";
import { RequestHelper } from "@/utils/helper/request.helper";
import axios from "axios";

type EmailInputProps = {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeHolder?: string;
  width?: string;
  type?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  isPassword?: boolean;
  onFocus?: () => void;
  fieldName: string;
  setError: (e: any) => void;
  errorObj: any;
  checkingURL: string;
};
interface checkUserEmailProps {
  email: string;
}

const EmailInput = ({ ...props }: EmailInputProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.fieldName === "email" && !props.error) {
      checkUserEmail({ email: props.value });
    }
  }, [props.error, props.onChange]);

  const checkUserEmail = async ({ email }: checkUserEmailProps) => {
    setLoading && setLoading(true);
    await axios(
      RequestHelper("POST", props.checkingURL, { payload: { email } }),
    )
      .then((response: any) => {
        const res = response.data.response;
        setLoading && setLoading(false);
      })
      .catch((error: any) => {
        const res = error?.response.data.response;
        if (res.status === "Error") {
          props.setError({ ...props.errorObj, ["email"]: res.message });
        }
        setLoading && setLoading(false);
      });
  };

  return (
    <div style={{ position: "inherit" }}>
      <AntInput
        name={props.name}
        type="email"
        id={props.name}
        value={props.value}
        label={props.label}
        placeHolder={props.placeHolder}
        onChange={props.onChange}
        disabled={loading ? true : false}
        error={props.error}
        onFocus={props.onFocus}
        autoFocus
      />

      <div style={{ position: "absolute" }}>
        <Spin
          style={{
            position: "absolute",
            transform: "translate(2000% , -160%)",
          }}
          spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 15 }} />}
        />
      </div>
    </div>
  );
};

export default EmailInput;
