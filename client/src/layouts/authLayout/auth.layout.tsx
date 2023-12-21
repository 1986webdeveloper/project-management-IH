import AntCard from "@/components/elements/card/card.element";
import { Outlet } from "react-router-dom";
import styles from "./auth.module.scss";
import authImage from "@/assets/authImage.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  return (
    <div className={styles.authWrapper}>
      <ToastContainer />
      <AntCard
        coverImage={
          <div className={styles.imageWrapper}>
            <img className={styles.image} alt="example" src={authImage} />
          </div>
        }
      >
        <div>{props.children}</div>
      </AntCard>
    </div>
  );
};

export default AuthLayout;
