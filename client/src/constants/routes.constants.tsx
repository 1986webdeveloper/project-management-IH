import { headingHelper } from "@/utils/helper/html.helper";
import { ReactNode } from "react";
import {
  FaChartBar,
  FaHandsHelping,
  FaTasks,
  FaUserFriends,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  REGISTER: "register",
  FORGOT_PASSWORD: "/forgot-pass",
  RESET_PASSWORD: "resetpassword",
  PROJECT: "project",
  CLIENT: "client",
  TASK: "task",
  USER: "user",
};

export interface RouteType {
  key: number;
  route: string;
  label: string;
  permission: string[];
  icon: ReactNode;
  heading: ReactNode;
}
const iconSize = 30;

export const AntRoute: RouteType[] = [
  {
    key: 1,
    route: ROUTES.DASHBOARD,
    label: "Dashboard",
    permission: ["ADMIN", "MANAGER", "EMPLOYEE"],
    icon: <MdDashboard />,
    heading: headingHelper("Dashboard", <MdDashboard size={iconSize} />),
  },
  {
    key: 2,
    route: ROUTES.USER,
    label: "User",
    permission: ["ADMIN"],
    icon: <FaUserFriends />,
    heading: headingHelper(
      "User Management",
      <FaUserFriends size={iconSize} />,
    ),
  },
  {
    key: 3,
    route: ROUTES.CLIENT,
    label: "Client",
    permission: ["ADMIN"],
    icon: <FaHandsHelping />,
    heading: headingHelper(
      "Client Management",
      <FaHandsHelping size={iconSize} />,
    ),
  },
  {
    key: 4,
    route: ROUTES.PROJECT,
    label: "Project",
    permission: ["ADMIN", "MANAGER"],
    icon: <FaChartBar />,
    heading: headingHelper(
      "Project Management",
      <FaChartBar size={iconSize} />,
    ),
  },
  {
    key: 5,
    route: ROUTES.TASK,
    label: "Task",
    permission: ["ADMIN", "MANAGER", "EMPLOYEE"],
    icon: <FaTasks />,
    heading: headingHelper("Task Management", <FaTasks size={iconSize} />),
  },
];
