import { Modal } from 'antd';
import { ReactNode } from 'react';

type FormModalProps = {
	children: ReactNode;
	open: boolean;
	onSubmit: (e: any) => void;
	handleCancel: () => void;
	loading: boolean;
	error: any;
	checkObject: any;
	title: string;
	SubmitButtonText: string;
};

const FormModal = ({
	checkObject,
	children,
	error,
	handleCancel,
	loading,
	onSubmit,
	open,

	title,
	SubmitButtonText,
}: FormModalProps) => {
	return (
		<Modal
			open={open}
			title={<span className="mb-10 text-blue-950">{title}</span>}
			onOk={onSubmit}
			width={800}
			onCancel={handleCancel}
			okButtonProps={{
				className: 'bg-blue-950',
				loading: loading,
				disabled: Object.values(error).some(value => value) || !Object.values(checkObject).every(value => value),
			}}
			okText={SubmitButtonText}
			cancelButtonProps={{ danger: true, type: 'primary' }}
		>
			{children}
		</Modal>
	);
};

export default FormModal;
