export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-pass",
  RESET_PASSWORD: "resetpassword",
  PROJECT: "project",
  CLIENT: "client",
  TASK: "task",
  USER: "user",
};

export const RouteMenu = [
  { key: 1, route: ROUTES.USER, label: "User" },
  { key: 2, route: ROUTES.CLIENT, label: "Client" },
  { key: 3, route: ROUTES.PROJECT, label: "Project" },
  { key: 4, route: ROUTES.TASK, label: "Task" },
];
