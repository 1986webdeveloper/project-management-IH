import AntCard from "@/components/elements/card/card.element";
import { Outlet } from "react-router-dom";
import styles from "./auth.module.scss";

export default function AuthLayout() {
  return (
    <div className={styles.authWrapper}>
      <AntCard
        coverImage={
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="example"
              src="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        }
      >
        <Outlet />
      </AntCard>
    </div>
  );
}
