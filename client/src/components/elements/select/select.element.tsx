import Select from "antd/es/select";
import styles from "./select.module.scss";

type AntSelectProps = {
  id: string;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFocus?: (e: any) => void;
  placeHolder?: string;
  label?: string;
  width?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  fieldLabel?: string;
  fieldValue?: string;
  isLoading?: boolean;
};

const AntSelect = ({ ...props }: AntSelectProps) => {
  return (
    <div className={styles.inputWrapper}>
      <span className={styles.label}>{props.label}</span>
      <Select
        id={props.id}
        onChange={props.onChange}
        style={{ width: props.width ?? "330px" }}
        options={props.options}
        bordered
        placeholder={props.placeHolder}
        status={props.error ? "error" : ""}
        disabled={props.disabled ?? false}
        className={props.className ?? styles.input}
        fieldNames={{ label: props.fieldLabel, value: props.fieldValue }}
        loading={props.isLoading}
        onFocus={props.onFocus}
        // value={props.value}
        value={props.value}
      />
      {props.error ? <span className={styles.error}>{props.error}</span> : ""}{" "}
    </div>
  );
};

export default AntSelect;
