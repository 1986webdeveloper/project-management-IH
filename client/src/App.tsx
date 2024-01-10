import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { ROUTES } from "./constants/routes.constants";
import { USER_ROLES } from "./constants/user.constant";
import AuthLayout from "./layouts/authLayout/auth.layout";
import DefaultLayout from "./layouts/defaultLayout/default.layout";
import ForgotPassword from "./pages/auth/forgotPassword.page";
import Login from "./pages/auth/login.page";
import Register from "./pages/auth/register.page";
import Client from "./pages/client.page";
import Home from "./pages/home.page";
import Project from "./pages/project.page";
import Task from "./pages/task.page";
import User from "./pages/user.page";
import AuthProvider from "./providers/auth.provider";
import { RootState } from "./store/store";
import ProjectProvider from "./providers/project .provider";
import ClientProvider from "./providers/client.provider";
import TaskProvider from "./providers/task.provider";
import UserProvider from "./providers/user.provider";

const App: React.FC = () => {
  const { auth, client, project, task, user } = useSelector(
    (state: RootState) => state,
  );
  const { isLoggedIn, loggedUser } = auth;

  const authenticatedRoutes = [
    {
      roles: [USER_ROLES.ADMIN],
      routes: [
        { path: ROUTES.HOME, element: <Home /> },
        {
          path: ROUTES.PROJECT,
          element: (
            <ProjectProvider>
              <Project
                projectList={project.projectList}
                clientList={client.clientList}
                managerList={user.managerList}
                employeeList={user.employeeList}
                key={"project"}
              />
            </ProjectProvider>
          ),
        },
        {
          path: ROUTES.USER,

          element: (
            <UserProvider>
              <User userList={user.userList} key={"user"} />,
            </UserProvider>
          ),
        },
        {
          path: ROUTES.CLIENT,
          element: (
            <ClientProvider>
              <Client
                clientList={client.clientList}
                managerList={user.managerList}
                key={"client"}
              />
            </ClientProvider>
          ),
        },
        {
          path: ROUTES.TASK,
          element: (
            <TaskProvider>
              <Task
                taskList={task.taskList}
                projectList={project.projectList}
                employeesList={user.employeeList}
                managerList={user.managerList}
                key={"task"}
              />
            </TaskProvider>
          ),
        },
      ],
    },
    {
      roles: [USER_ROLES.MANAGER],
      routes: [
        { path: ROUTES.HOME, element: <Home /> },
        {
          path: ROUTES.PROJECT,
          element: (
            <ProjectProvider>
              <Project
                projectList={project.projectList}
                clientList={client.clientList}
                managerList={user.managerList}
                employeeList={user.employeeList}
                key={"task"}
              />
            </ProjectProvider>
          ),
        },
        {
          path: ROUTES.TASK,
          element: (
            <TaskProvider>
              <Task
                taskList={task.taskList}
                projectList={project.projectList}
                employeesList={user.employeeList}
                managerList={user.managerList}
                key={"task"}
              />
            </TaskProvider>
          ),
        },
      ],
    },
    {
      roles: [USER_ROLES.EMPLOYEE],
      routes: [
        { path: ROUTES.HOME, element: <Home /> },
        {
          path: ROUTES.TASK,
          element: (
            <TaskProvider>
              <Task
                taskList={task.taskList}
                projectList={project.projectList}
                employeesList={user.employeeList}
                managerList={user.managerList}
                key={"task"}
              />
            </TaskProvider>
          ),
        },
      ],
    },
  ];

  const unauthenticatedRoutes = [
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.REGISTER, element: <Register /> },
    { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
  ];

  const getRoutesForRole = (role: string) => {
    const routes = authenticatedRoutes.find((authRoute) =>
      authRoute.roles.includes(role),
    );
    return routes ? routes.routes : [];
  };

  const renderAuthenticatedRoutes = () => {
    if (isLoggedIn && auth?.loggedUser) {
      const routesForRole = getRoutesForRole(loggedUser?.role);
      return (
        <DefaultLayout>
          {/* <GlobalProvider> */}
          <Routes>
            {routesForRole.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route
              path="*"
              element={<Navigate to={ROUTES.HOME} replace={true} />}
            />
          </Routes>
          {/* </GlobalProvider> */}
        </DefaultLayout>
      );
    }
    return null;
  };

  const renderUnauthenticatedRoutes = () => {
    if (!isLoggedIn) {
      return (
        <AuthLayout>
          <Routes>
            {unauthenticatedRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route
              path="*"
              element={<Navigate to={ROUTES.LOGIN} replace={true} />}
            />
          </Routes>
        </AuthLayout>
      );
    }
    return null;
  };

  return (
    <AuthProvider isLoggedIn={auth.isLoggedIn}>
      {renderAuthenticatedRoutes() || renderUnauthenticatedRoutes()}
    </AuthProvider>
  );
};

export default App;
