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

const AntDatePicker = ({ value, label, onChange }: InputProps) => {
  console.log("props.value===", value);
  return (
    <div className={styles.inputWrapper}>
      {label ? <span className={styles.label}>{label}</span> : ""}

      {/* <input type="date" value={value} onChange={onchange} /> */}

      <DatePicker
        onChange={(date, dateString) => {
          onChange(date, dateString);
        }}
        defaultValue={value ? dayjs(value) : undefined}
        allowClear
      />
    </div>
  );
};

export default AntDatePicker;
