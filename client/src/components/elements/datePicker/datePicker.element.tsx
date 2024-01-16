import { DatePicker, Popover } from "antd";
import styles from "./datePicker.module.scss";
import dayjs, { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import { FcInfo } from "react-icons/fc";

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
  transformStyle?: string;
  minDate?: string;
  maxDate?: string;
  applyAgeValidation?: boolean;
  onFocus?: () => void;
  defaultValue?: Dayjs;
  info?: boolean;
};

const AntDatePicker = ({
  value,
  label,
  onChange,
  error,
  transformStyle,
  width,
  minDate,
  maxDate,
  applyAgeValidation,
  onFocus,
  defaultValue,
  info,
}: InputProps) => {
  const dynamicDisabledDate: (
    minDate?: dayjs.ConfigType,
    maxDate?: dayjs.ConfigType,
    applyAgeValidation?: boolean,
  ) => RangePickerProps["disabledDate"] = (
    minDate,
    maxDate,
    applyAgeValidation = true,
  ) => {
    // console.log({ minDate, maxDate, applyAgeValidation });
    return (current) => {
      // Apply age validation if needed
      if (applyAgeValidation) {
        const minBirthdate = dayjs().subtract(15, "years").startOf("day");
        const minBirthYear = minBirthdate.year(); // Get the year of the minimum birthdate

        const selectedYear = dayjs(current).year(); // Get the year of the selected date

        // Allow dates for users 15 years or older (born in 2009 or earlier)
        if (current && selectedYear <= minBirthYear) {
          return false;
        }

        // Disable dates for users less than 15 years old (born after 2009)
        return true;
      }

      // Disable dates before today and today
      if (current && current < dayjs().endOf("day")) {
        return true;
      }

      // Check if there is a minimum date and disable dates before it
      if (minDate && current && current < dayjs(minDate).startOf("day")) {
        return true;
      }

      // Check if there is a maximum date and disable dates after it
      if (maxDate && current && current > dayjs(maxDate).endOf("day")) {
        return true;
      }

      return false; // If no validation is applied, allow all dates
    };
  };

  return (
    <div className={styles.inputWrapper}>
      {label ? <span className={styles.label}>{label}</span> : ""}
      <DatePicker
        style={{ width: width ?? "" }}
        disabledDate={dynamicDisabledDate(minDate, maxDate, applyAgeValidation)}
        onChange={(date, dateString) => {
          onChange(date, dateString);
        }}
        value={value ? dayjs(value) : null}
        allowClear={true}
        defaultValue={defaultValue}
        status={error ? "error" : ""}
        onFocus={onFocus}
      />
      {info ? (
        <div className={styles.infoDiv}>
          <Popover
            placement="bottom"
            title={"Mandatory Age"}
            content={
              <div className={styles.popContent}>
                Any employee must be 15 years or above
                {/* <br /> one lowercase, one number and one special <br />
                character */}
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
      {error ? (
        <span
          className={styles.error}
          style={{
            transform: transformStyle ? transformStyle : "translate(1%, 87%)",
          }}
        >
          {error}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default AntDatePicker;
