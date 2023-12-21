import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Home from "./pages/home.page";
import Project from "./pages/project.page";
import Client from "./pages/client.page";
import Task from "./pages/task.page";
import User from "./pages/user.page";
import Login from "./pages/auth/login.page";
import Register from "./pages/auth/register.page";
import DefaultLayout from "./layouts/defaultLayout/default.layout";
import AuthLayout from "./layouts/authLayout/auth.layout";
import { ROUTES } from "./constants/routes.constants";
import { USER_ROLES } from "./constants/user.constant";
import ProjectProvider from "./providers/project .provider";

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userRole = useSelector((state: any) => state.auth.role);
  const stateProps = useSelector((state: RootState) => state);
  console.log("state props---", stateProps);
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          {userRole === USER_ROLES.ADMIN && (
            <>
              <Route
                path={ROUTES.HOME}
                element={
                  <DefaultLayout>
                    <Home />
                  </DefaultLayout>
                }
              />
              <Route
                path={ROUTES.PROJECT}
                element={
                  <DefaultLayout>
                    <ProjectProvider>
                      <Project props={stateProps} />
                    </ProjectProvider>
                  </DefaultLayout>
                }
              />
              <Route
                path={ROUTES.USER}
                element={
                  <DefaultLayout>
                    <User />
                  </DefaultLayout>
                }
              />
              {/* Add other admin routes */}
            </>
          )}
          {userRole === "manager" && (
            <>
              <Route
                path={ROUTES.HOME}
                element={
                  <DefaultLayout>
                    <Home />
                  </DefaultLayout>
                }
              />
              <Route
                path={ROUTES.CLIENT}
                element={
                  <DefaultLayout>
                    <Client />
                  </DefaultLayout>
                }
              />
              <Route
                path={ROUTES.TASK}
                element={
                  <DefaultLayout>
                    <Task />
                  </DefaultLayout>
                }
              />
              {/* Add other manager routes */}
            </>
          )}
          {userRole === "employee" && (
            <>
              <Route
                path={ROUTES.HOME}
                element={
                  <DefaultLayout>
                    <Home />
                  </DefaultLayout>
                }
              />
              <Route
                path={ROUTES.TASK}
                element={
                  <DefaultLayout>
                    <Task />
                  </DefaultLayout>
                }
              />
              {/* Add other employee routes */}
            </>
          )}
        </>
      ) : (
        <>
          <Route
            path={ROUTES.LOGIN}
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
          {/* Add other authentication-related routes */}
        </>
      )}
      <Route
        path="*"
        element={
          <Navigate
            to={isLoggedIn ? ROUTES.HOME : ROUTES.LOGIN}
            replace={true}
          />
        }
      />
    </Routes>
  );
};

export default App;
