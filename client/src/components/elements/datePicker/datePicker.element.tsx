import { DatePicker } from "antd";
import styles from "./datePicker.module.scss";
import dayjs, { Dayjs } from "dayjs";

type InputProps = {
  name: string;
  value: string;
  onChange: (date: Dayjs | null, dateString: string) => void;
  label?: string;
  placeHolder?: string;
  width?: string;
  type?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  isPassword?: boolean;
};

const AntDatePicker = ({ value, label, onChange, error }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label ? <span className={styles.label}>{label}</span> : ""}
      <DatePicker
        onChange={(date, dateString) => {
          onChange(date, dateString);
        }}
        value={value ? dayjs(value) : null}
        allowClear={true}
        status={error ? "error" : ""}
      />
      {error ? <span className={styles.error}>{error}</span> : ""}
    </div>
  );
};

export default AntDatePicker;
