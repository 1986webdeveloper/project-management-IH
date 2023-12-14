import { ReactNode, useEffect, useState } from "react";
import ProjectService from "@/utils/service/project.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Spin } from "antd";

type Props = {
  children: ReactNode;
};

const ProjectProvider = (props: Props) => {
  const { GetProject } = ProjectService();
  const [loading, setLoading] = useState(false);
  const projectList = useSelector(
    (state: RootState) => state.project.projectList,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    GetProject({ dispatch, setLoading });
  }, []);

  return <Spin spinning={loading}>{props.children}</Spin>;
};

export default ProjectProvider;
