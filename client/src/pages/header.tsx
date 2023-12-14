import { ReactNode } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Tabs, TabsProps } from "antd";

type Props = {
  children?: ReactNode;
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Home",
  },
  {
    key: "2",
    label: "Project",
  },
  {
    key: "3",
    label: "Clients",
  },
];

const CustomHeader = ({ children }: Props) => {
  const onTabChange = (key: string) => {
    const index = Number(key) - 1;
    console.log(items[index].label);
  };
  return (
    <div className="flex p-4 items-center justify-between w-full shadow-xl">
      <div className="flex gap-2">
        <div className="border-solid border-2 p-2 border-slate-950">Logo</div>
        <div>
          <Tabs
            defaultActiveKey="1"
            centered
            onChange={(key) => {
              onTabChange(key);
            }}
            items={items}
          />
        </div>
      </div>
      <div>
        <Badge count={3}>
          <Avatar shape="circle" icon={<UserOutlined />} />
        </Badge>
      </div>
    </div>
  );
};

export default CustomHeader;
