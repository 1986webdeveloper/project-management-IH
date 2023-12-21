import { RootState } from "@/store/store";
import UserService from "@/utils/service/user.service";
import { Spin } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: ReactNode;
};

const MainProvider = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const stateData = useSelector((state: RootState) => state);

  const { getUserList } = UserService();

  const dispatch = useDispatch();

  useEffect(() => {
    getUserList({ dispatch, setLoading });
  }, []);
  //   }
  return <Spin spinning={loading}>{props.children}</Spin>;
};

export default MainProvider;
