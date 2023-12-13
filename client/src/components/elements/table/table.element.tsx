/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";

type Props = {
  columns: any;
  data: any;
};

const AntTable = ({ columns, data }: Props) => {
  return <Table columns={columns} dataSource={data} />;
};

export default AntTable;
