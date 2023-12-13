import { ReactNode, useEffect } from "react";
import ProjectService from "@/utils/service/project.service";
import { useDispatch } from "react-redux";

type Props = {
  children: ReactNode;
};

const ProjectProvider = (props: Props) => {
  const { GetProject } = ProjectService();

  const dispatch = useDispatch();

  useEffect(() => {
    GetProject({ dispatch });
  }, []);

  return <>{props.children}</>;
};

export default ProjectProvider;
