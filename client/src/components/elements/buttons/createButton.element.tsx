import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type CreateButtonProps = {
	onCreate: () => void;
};

const CreateButton = ({ onCreate }: CreateButtonProps) => {
	return (
		<Button
			type="primary"
			onClick={onCreate}
			icon={<PlusOutlined />}
			shape="round"
			size={'large'}
			className="bg-blue-950"
		>
			Create
		</Button>
	);
};

export default CreateButton;
