import { Input, Popover } from "antd";
import { ChangeEvent } from "react";
import styles from "./input.module.scss";
import { FcInfo } from "react-icons/fc";

type InputProps = {
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
};

const AntInput = ({ ...props }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {props.label ? <span className={styles.label}>{props.label}</span> : ""}
      <Input
        style={{ width: props.width ?? "330px" }}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeHolder}
        type={props.type ?? "text"}
        bordered
        className={props.className ?? styles.input}
        status={props.error ? "error" : ""}
        disabled={props.disabled ?? false}
        autoComplete={props.value}
      />
      {props.isPassword ? (
        <div className={styles.infoDiv}>
          <Popover
            placement="bottom"
            title={"Password help"}
            content={
              <div className={styles.popContent}>
                Password must contain one uppercase,
                <br /> one lowercase, one number and one special <br />
                character
              </div>
            }
            trigger="hover"
          >
            <FcInfo />
          </Popover>
        </div>
      ) : (
        ""
      )}
      {props.error ? <span className={styles.error}>{props.error}</span> : ""}
    </div>
  );
};

export default AntInput;
