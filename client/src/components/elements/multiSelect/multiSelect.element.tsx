/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import styles from "./multiSelect.module.scss";
import { useState } from "react";

interface MultiSelectProps {
  options: any[];
  id?: string;
  optionLabel: string;
  placeHolder?: string;
  label?: string;
  width?: number;
  error?: string;
  disabled?: boolean;
  className?: string;
  fieldLabel?: string;
  fieldValue?: string;
  value?: any[];

  onChange: (e: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFocus?: (e: any) => void;
}

const AntMultiSelect = ({ options, onChange, ...props }: MultiSelectProps) => {
  const [searchText, setSearchText] = useState("");
  const filteredList = () => {
    const _filtered: any = [];
    if (props.value)
      for (const key in options) {
        if (options[key] !== props.value[key]) {
          _filtered.push(options[key]);
        }
      }
    return _filtered;
  };

  return (
    <div className={styles.inputWrapper}>
      <span className={styles.label}>{props.label}</span>
      <Select
        // id={props.id}
        mode="multiple"
        placeholder={props.placeHolder}
        value={props.value}
        onChange={onChange}
        className={styles.select}
        style={{
          width: props.width ? props.width : "350px",
        }}
        autoFocus
        popupClassName={styles.selectedPop}
        maxTagCount={4}
        //*searching and fitering
        optionLabelProp="label"
        searchValue={searchText}
        onSearch={(e) => setSearchText(e)}
        allowClear
        filterOption={true}
        //*searching and fitering
        options={filteredList()?.map((item: any) => ({
          value: item.value,
          label: item.label,
        }))}
        onFocus={props.onFocus}
        status={props.error ? "error" : ""}
      />
      {props.error ? <span className={styles.error}>{props.error}</span> : ""}{" "}
    </div>
  );
};

export default AntMultiSelect;
