import { Avatar, Badge, Button, Popover } from "antd";
import { ROUTES } from "@/constants/routes.constants";
import { useNavigate } from "react-router-dom";
import AuthServices from "@/utils/service/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (e: boolean) => void;
  Heading: ReactNode;
}
const CustomHeader = ({ collapsed, setCollapsed, Heading }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { LogoutService } = AuthServices({ dispatch });
  const currentUser = useSelector((state: RootState) => state.auth.loggedUser);

  const AvatarPopTemplate = () => {
    return (
      <Button danger type="primary" onClick={() => LogoutService()}>
        Logout
      </Button>
    );
  };

  return (
    <div className="flex p-2 px-5 items-center justify-between w-full shadow-xl">
      <div className="flex gap-2">
        <div
          className="flex items-center justify-center p-2  cursor-pointer"
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 40,
              height: 40,
            }}
          />
          {/* <img width={50} src={logoImage} alt="LogoImage" /> */}
          <span className="text-xl font-extrabold">{Heading}</span>
        </div>
      </div>
      <div>
        <Popover
          content={AvatarPopTemplate}
          title={
            <div className="flex flex-col">
              <span className="text-lg">{currentUser.name}</span>
              <span className="text-xs w-0">{currentUser.role}</span>
            </div>
          }
        >
          <Badge count={1}>
            <Avatar
              className="cursor-pointer"
              shape="circle"
              icon={<UserOutlined />}
            />
          </Badge>
        </Popover>
      </div>
    </div>
  );
};

export default CustomHeader;
