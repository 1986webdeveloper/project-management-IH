import { ProjectDTO } from "@/types/fieldTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  projectList: ProjectDTO[];
  // Other authentication-related state can be stored here
}

const initialState: AuthState = {
  projectList: [] as ProjectDTO[],
};

const projectSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    setProjectList: (state, action: PayloadAction<ProjectDTO[]>) => {
      state.projectList = action.payload;
    },
    // Other authentication-related actions can be defined here
  },
});

export const { setProjectList } = projectSlice.actions;
export default projectSlice.reducer;
