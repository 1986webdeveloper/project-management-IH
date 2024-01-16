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
};
interface checkUserEmailProps {
  email: string;
}
interface EmailResponseDTO {
  message: string;
  status: string;
  statusCode: number;
}

const EmailInput = ({ ...props }: EmailInputProps) => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState({} as EmailResponseDTO);

  useEffect(() => {
    if (props.fieldName === "email" && !props.error) {
      checkUserEmail({ email: props.value });
    }
    return setResponseData({} as any);
  }, [props.error, props.value]);

  const checkUserEmail = async ({ email }: checkUserEmailProps) => {
    setLoading && setLoading(true);
    await axios(
      RequestHelper("POST", API_LIST.CHECK_USER_EMAIL, { payload: { email } }),
    )
      .then((response: any) => {
        const _data = response.data;
        setResponseData(_data.response);
        setLoading && setLoading(false);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data;
        setResponseData(errorMessage.response);
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
        {!props.error && (
          <span
            style={{
              position: "absolute",
              fontSize: "0.7rem",
              fontWeight: "600",
              marginLeft: "0.5rem",
              width: "10rem",
              transform: "translate(3%, -8%)",

              color: responseData?.status === "Success" ? "green" : "orange",
            }}
          >
            {responseData?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
