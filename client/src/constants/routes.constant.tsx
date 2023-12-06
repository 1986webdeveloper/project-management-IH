import { AiFillDashboard } from "react-icons/ai";

export const ROUTES = {
  DASHBOARD: "/",
  LOG_IN: "/",
  SIGN_UP: "/signUp",
  USER_PROFILE: "/updateUser",
  NEWS_DETAILS: "/view",
};

export const RouteMenu = [
  {
    key: ROUTES.DASHBOARD,
    icon: <AiFillDashboard />,
    label: "Dashboard",
    route: ROUTES.DASHBOARD,
  },
];
