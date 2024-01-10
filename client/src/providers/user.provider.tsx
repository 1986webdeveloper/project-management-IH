import UserService from "@/utils/service/user.service";
import { Spin } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  children: ReactNode;
};

const UserProvider = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { GetUserList } = UserService({ dispatch, setLoading });

  useEffect(() => {
    GetUserList({});
  }, []);

  return <Spin spinning={loading}>{props.children}</Spin>;
};

export default UserProvider;
