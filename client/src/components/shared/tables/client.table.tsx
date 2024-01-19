import DeleteButton from "@/components/elements/buttons/deleteButton.element";
import EditButton from "@/components/elements/buttons/editButton.element";
import AntTable from "@/components/elements/table/table.element";
import { ClientDTO } from "@/types/fieldTypes";
import { ColumnsType } from "antd/es/table";

type Props = {
  clientList: ClientDTO[];
  onEdit: (e: ClientDTO) => void;
  onDelete: (e: ClientDTO) => void;
  loading: boolean;
};

const ClientTable = ({ clientList, onDelete, onEdit, loading }: Props) => {
  const columns: ColumnsType<ClientDTO> = [
    {
      title: <span className="text-blue-950">Client Name</span>,
      dataIndex: "clientName",
      key: "clientName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: <span className="text-blue-950">On Boarding Date</span>,
      dataIndex: "onBoardingDate",
      key: "onBoardingDate",
    },
    {
      title: <span className="text-blue-950">Industry</span>,
      dataIndex: "industry",
      key: "industry",
    },

    {
      title: <span className="text-blue-950">Action</span>,
      dataIndex: "action",
      key: "action",
      render: (_, rowData) => {
        return (
          <div className="flex gap-5">
            <EditButton onClick={onEdit} rowData={rowData} />
            <DeleteButton
              loading={loading}
              onDelete={onDelete}
              rowData={rowData}
            />
          </div>
        );
      },
    },
  ];

  return (
    <AntTable
      columns={columns}
      data={clientList.map((client, index) => ({ ...client, key: index }))}
    />
  );
};

export default ClientTable;
