import { RootState } from "@/store/store";
import { UserDTO } from "@/types/auth.types";
import { useSelector } from "react-redux";

const useList = () => {
  const userList = useSelector((state: RootState) => state.user.userList);

  const roleHelper = (role: string) => {
    const allUser: UserDTO[] = [...userList];
    const labelValuePair: any = [];

    for (const key of allUser) {
      if (key.role === role) {
        const _obj = { label: key.name, value: key._id };
        labelValuePair.push(_obj);
      }
    }
    return labelValuePair;
  };

  const ModuleList = (list: any[], label: string) => {
    const allProjects = [...list];
    const labelValuePair: any[] = [];
    console.log(list, "lliisstt.,,..,,");

    for (const key of allProjects) {
      const _obj = { label: key[label], value: key._id };
      labelValuePair.push(_obj);
    }

    return labelValuePair;
  };

  return { roleHelper, ModuleList };
};

export default useList;
