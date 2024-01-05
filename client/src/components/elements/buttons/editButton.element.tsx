import { EditOutlined } from '@ant-design/icons';

type EditButtonProps = {
	onClick: (e: any) => void;
	rowData: any;
};

const EditButton = ({ onClick, rowData }: EditButtonProps) => {
	return <EditOutlined className="hover:text-blue-500" onClick={() => onClick(rowData)} />;
};

export default EditButton;
