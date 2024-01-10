import { RootState } from "@/store/store";
import { getToken } from "@/utils/helper/localstorage.helper";
import AuthServices from "@/utils/service/auth.service";
import { Spin } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AuthProviderProps = {
  children: ReactNode;
  isLoggedIn: boolean;
};

const AuthProvider = ({ children, isLoggedIn }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { getCurrentUserService, LogoutService } = AuthServices({
    dispatch,
    setLoading,
  });

  useEffect(() => {
    if (isLoggedIn) getCurrentUserService();

    // * this is used to listen to action of localStorage and logout the user.
    const handleStorageChange = () => {
      const token = getToken();
      if (!token) {
        LogoutService();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Spin spinning={loading}>
      <ToastContainer />
      {children}
    </Spin>
  );
};

export default AuthProvider;
