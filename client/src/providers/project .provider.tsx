import { ReactNode, useEffect, useState } from "react";
import ProjectService from "@/utils/service/project.service";
import { useDispatch } from "react-redux";
import { Spin } from "antd";

type Props = {
  children: ReactNode;
};

const ProjectProvider = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { GetProject } = ProjectService({ dispatch, setLoading });

  useEffect(() => {
    GetProject();
  }, []);

  return <Spin spinning={loading}>{props.children}</Spin>;
};

export default ProjectProvider;
