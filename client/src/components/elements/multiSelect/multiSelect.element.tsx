/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from 'antd';
import styles from './multiSelect.module.scss';

interface MultiSelectProps {
	options: any[];
	optionLabel: string;
	placeHolder?: string;
	label?: string;
	width?: number;
	error?: string;
	disabled?: boolean;
	className?: string;
	fieldLabel?: string;
	fieldValue?: string;
	value?: string[];
	onChange: (e: any[]) => void;
}

const AntMultiSelect = ({ options, onChange, ...props }: MultiSelectProps) => {
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
				mode="multiple"
				placeholder={props.placeHolder}
				value={props.value}
				onChange={onChange}
				className={styles.select}
				style={{
					width: props.width ? props.width : '350px',
				}}
				allowClear
				filterOption={true}
				autoFocus
				popupClassName={styles.selectedPop}
				maxTagCount={4}
				optionLabelProp="label"
				options={filteredList()?.map((item: any) => ({
					value: item.value,
					label: item.label,
				}))}
			/>
			{props.error ? <span className={styles.error}>{props.error}</span> : ''}{' '}
		</div>
	);
};

export default AntMultiSelect;
