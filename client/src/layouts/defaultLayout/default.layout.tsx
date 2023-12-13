import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./default.module.scss";
import CustomHeader from "@/pages/header";
import CustomFooter from "@/pages/footer";

const { Content } = Layout;

export default function DefaultLayout() {
  return (
    <Layout className={styles.spaceStyle}>
      <CustomHeader />
      <Content className={styles.contentStyle}>
        <Outlet />
      </Content>
      <CustomFooter />
      {/* <Footer className={styles.footerStyle}>Footer</Footer>
       */}
    </Layout>
  );
}
