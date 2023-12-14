import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./default.module.scss";

import CustomFooter from "@/pages/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomHeader from "@/components/shared/header";

const { Content } = Layout;

export default function DefaultLayout() {
  return (
    <Layout className={styles.spaceStyle}>
      <CustomHeader />
      <ToastContainer />
      <Content className={styles.contentStyle}>
        <Outlet />
      </Content>
      <CustomFooter />
      {/* <Footer className={styles.footerStyle}>Footer</Footer>
       */}
    </Layout>
  );
}
