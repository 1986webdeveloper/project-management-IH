import { USER_ROLES } from "@/constants/user.constant";
import { UserDTO } from "@/types/auth.types";
import Card from "antd/es/card/Card";
import AdminDashboard from "./admin.dashboardPage";
import ManagerDashboard from "./manager.dashboardPage";
import EmployeeDashboard from "./employee.dashboardPage";
import HrDashboard from "./hr.dashboardPage";
import AuthServices from "@/utils/service/auth.service";

interface HomeProps {
  loggedUser: UserDTO;
}

const Dashboard = ({ loggedUser }: HomeProps) => {
  const { LogoutService } = AuthServices({});

  const handleNoUserRole = () => {
    LogoutService();
    return "No User Role Present";
  };

  return (
    <div className="flex justify-center flex-wrap gap-4 w-full p-4  bg-white-100 ">
      <Card className=" w-full h-[88.5vh] border-none shadow-2xl shadow-slate-70 flex items-center justify-center">
        {loggedUser.role === USER_ROLES.ADMIN ? (
          <AdminDashboard />
        ) : loggedUser.role === USER_ROLES.MANAGER ? (
          <ManagerDashboard />
        ) : loggedUser.role === USER_ROLES.EMPLOYEE ? (
          <EmployeeDashboard />
        ) : loggedUser.role === USER_ROLES.HR ? (
          <HrDashboard />
        ) : (
          handleNoUserRole()
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
