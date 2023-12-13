/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import styles from "./multiSelect.module.scss";

interface MultiSelectProps {
  options: any[];
  selectedItems: any[];
  setSelectedItems: (e: any) => void;
  placeHolder?: string;
  label?: string;
  width?: number;
  error?: string;
  disabled?: boolean;
  className?: string;
  fieldLabel?: string;
  fieldValue?: string;
  value?: string[];
}

const AntMultiSelect = ({
  options,
  selectedItems,
  setSelectedItems,
  ...props
}: MultiSelectProps) => {
  const filteredList = () => {
    const _filtered: any = [];

    for (const key in options) {
      if (options[key] !== selectedItems[key]) {
        _filtered.push(options[key]);
      }
    }
    return _filtered;
  };

  return (
    <div className={styles.inputWrapper}>
      <span className={styles.label}>{props.label}</span>
      <Select
        mode="multiple"
        placeholder={props.placeHolder}
        value={selectedItems}
        onChange={setSelectedItems}
        className={styles.select}
        style={{
          width: props.width ? props.width : "350px",
        }}
        allowClear
        filterOption={true}
        autoFocus
        popupClassName={styles.selectedPop}
        maxTagCount={4}
        optionLabelProp="label"
        onClear={() => setSelectedItems([])}
        options={filteredList()?.map((item: any) => ({
          value: item.value,
          label: item.label,
        }))}
      />
      {props.error ? <span className={styles.error}>{props.error}</span> : ""}{" "}
    </div>
  );
};

export default AntMultiSelect;
