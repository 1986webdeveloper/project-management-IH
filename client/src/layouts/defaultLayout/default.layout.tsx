import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./default.module.scss";
import CustomFooter from "@/components/shared/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomHeader from "@/components/shared/header";
import ProjectProvider from "@/providers/project .provider";
import ClientProvider from "@/providers/client.provider";
import TaskProvider from "@/providers/task.provider";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AuthServices from "@/utils/service/auth.service";
import UserProvider from "@/providers/user.provider";
import MainProvider from "@/providers/main.provider";
import UserService from "@/utils/service/user.service";

const { Content } = Layout;

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { auth, user } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);
  const [hasFetchedUserList, setHasFetchedUserList] = useState(false);

  const dispatch = useDispatch();
  const { LogoutService } = AuthServices();

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      LogoutService({ dispatch });
    } else {
      // Check if the user list is empty or if it has been fetched before
      if (!user.userList.length && !hasFetchedUserList) {
        const { getUserList } = UserService();
        getUserList({ dispatch, setLoading });
        setHasFetchedUserList(true); // Update the state once the user list is fetched
      }
    }
  }, [
    auth?.isLoggedIn,
    user.userList.length,
    hasFetchedUserList,
    dispatch,
    setLoading,
  ]);
  return (
    <Layout className={styles.spaceStyle}>
      <CustomHeader />
      <ToastContainer />
      <Content className={styles.contentStyle}>{props.children}</Content>
      <CustomFooter />
    </Layout>
  );
};

export default DefaultLayout;
