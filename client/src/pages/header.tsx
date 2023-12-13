import { ReactNode } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";

type Props = {
  children?: ReactNode;
};

const CustomHeader = ({ children }: Props) => {
  console.log(children);
  return (
    <div className="flex p-4 items-center justify-between w-full shadow-xl">
      <div className="border-solid border-2 border-b-slate-950">Logo</div>
      <div>
        <Badge count={3}>
          <Avatar shape="circle" icon={<UserOutlined />} />
        </Badge>
      </div>
    </div>
  );
};

export default CustomHeader;
