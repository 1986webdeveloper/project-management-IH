import { UserDTO } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userList: UserDTO[];
  employeeList: UserDTO[];
  managerList: UserDTO[];
}

const initialState: UserState = {
  userList: [] as UserDTO[],
  employeeList: [] as UserDTO[],
  managerList: [] as UserDTO[],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<UserDTO[]>) => {
      state.userList = action.payload;
    },
    setEmployeeList: (state, action: PayloadAction<UserDTO[]>) => {
      state.employeeList = action.payload;
    },
    setManagerList: (state, action: PayloadAction<UserDTO[]>) => {
      state.managerList = action.payload;
    },
  },
});

export const { setUserList, setEmployeeList, setManagerList } =
  UserSlice.actions;
export default UserSlice.reducer;
