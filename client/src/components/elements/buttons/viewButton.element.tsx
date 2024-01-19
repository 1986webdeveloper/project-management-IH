import { EyeOutlined } from "@ant-design/icons";

type ViewButtonProps = {
  onClick: (e: any) => void;
  rowData: any;
};

const ViewButton = ({ onClick, rowData }: ViewButtonProps) => {
  return (
    <EyeOutlined
      className="hover:text-blue-500"
      onClick={() => onClick(rowData)}
    />
  );
};

export default ViewButton;
