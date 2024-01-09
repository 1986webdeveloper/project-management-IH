import { Modal } from "antd";
import AntCard from "@/components/elements/card/card.element";
import AntTable from "@/components/elements/table/table.element";
import { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { ClientDTO } from "@/types/fieldTypes";
import { ChangeEvent, useState } from "react";
import AntInput from "@/components/elements/Input/Input.element";
import AntDatePicker from "@/components/elements/datePicker/datePicker.element";
import { Dayjs } from "dayjs";
import ClientService from "@/utils/service/client.service";
import { errorToastHelper } from "@/utils/helper/toast.helper";
import { initClient } from "@/constants/general.constants";
import AntMultiSelect from "@/components/elements/multiSelect/multiSelect.element";
import { USER_ROLES } from "@/constants/user.constant";
import useList from "@/utils/helper/array.helper";
import EditButton from "@/components/elements/buttons/editButton.element";
import DeleteButton from "@/components/elements/buttons/deleteButton.element";
import CreateButton from "@/components/elements/buttons/createButton.element";
import UserService from "@/utils/service/user.service";
import { UserDTO } from "@/types/auth.types";

interface ClientProps {
  clientList: ClientDTO[];
  managerList: UserDTO[];
}

const Client = ({ clientList, managerList }: ClientProps) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientDetails, setClientDetails] = useState(initClient);
  const dispatch = useDispatch();
  const { getUserList } = UserService({ dispatch, setLoading });
  const { CreateClient, DeleteClient, UpdateClient } = ClientService({
    dispatch,
    setLoading,
  });
  const { roleHelper, ModuleList } = useList();
  const [error, setError] = useState({
    clientName: "",
    onBoardingDate: "",
    industry: "",
    managerList: "",
  });
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
    // {
    //   title: <span className="text-blue-950">Manager</span>,
    //   dataIndex: "managerList",
    //   key: "managerList",
    //   render: (text) => {
    //     return text.map((x: any) => {
    //       return (
    //         <a>
    //           <Tag>{x.name}</Tag>
    //         </a>
    //       );
    //     });
    //   },
    // },
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

  // *handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientDetails({ ...clientDetails, [name]: value });
  };

  const handleDateSelect = (
    date: Dayjs | null,
    dateString: string,
    id: string,
  ) => {
    setClientDetails({ ...clientDetails, [id]: dateString });
  };

  // *modal actions
  const showModal = () => {
    setClientDetails(initClient);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setEdit(false);
  };

  // *FormActions
  const onEdit = (data: ClientDTO) => {
    console.log(data);
    setClientDetails(data);
    setOpen(true);
    setEdit(true);
  };

  const onDelete = (data: ClientDTO) => {
    if (!data._id) return errorToastHelper("Project ID not found!!");
    DeleteClient({
      clientId: data?._id ?? "",
    });
  };

  const onSubmit = () => {
    console.log(clientDetails);
    // if (!isEdit) {
    //   CreateClient({
    //     payload: clientDetails,
    //     setOpen: setOpen,
    //   });
    // }
    // if (isEdit) {
    //   UpdateClient({
    //     payload: clientDetails,
    //     setIsEdit: setEdit,
    //     setOpen: setOpen,
    //   });
    // }
  };

  const handleMultiSelect = (e: any, name: string) => {
    setClientDetails({ ...clientDetails, [name]: [...e] });
  };

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <AntCard
        cardTitle={
          <div className="flex w-full items-center justify-between p-4">
            <span className="text-xl">Client Summary</span>
            <CreateButton onCreate={showModal} />
          </div>
        }
      >
        <AntTable columns={columns} data={clientList}></AntTable>
      </AntCard>
      <Modal
        open={open}
        title={
          <span className="mb-10 text-blue-950">
            {isEdit ? "Edit Project" : "Create Project"}
          </span>
        }
        onOk={onSubmit}
        width={800}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-950", loading: loading }}
        okText={isEdit ? "Update" : "Save"}
        cancelButtonProps={{ danger: true, type: "primary" }}
      >
        <div className="grid py-7 grid-rows-2 text-blue-950 grid-flow-col items-start w-[100%]">
          <AntInput
            name={"clientName"}
            label="Client Name"
            placeHolder={"Enter Your Client Name"}
            value={clientDetails.clientName}
            onChange={handleChange}
            error={error.clientName}
          />
          <AntInput
            name={"industry"}
            label="Industry"
            placeHolder={"Enter Your expertise field"}
            value={clientDetails.industry}
            onChange={handleChange}
            error={error.industry}
          />
          <AntMultiSelect
            width={330}
            value={
              isEdit
                ? ModuleList(clientDetails.managerList, "name")
                : clientDetails.managerList
            }
            label="Managers"
            placeHolder="Select manager"
            options={ModuleList(managerList, "name")}
            onChange={(e) => {
              handleMultiSelect(e, "managerList");
            }}
            onFocus={() => getUserList({ role: USER_ROLES.MANAGER })}
            optionLabel={"label"}
            error={error.managerList}
          />
          <AntDatePicker
            name={"onBoardingDate"}
            value={
              clientDetails?.onBoardingDate?.length > 0
                ? clientDetails?.onBoardingDate
                : ""
            }
            label="Onboarding Date"
            onChange={(date, dateString) =>
              handleDateSelect(date, dateString, "onBoardingDate")
            }
            error={error.onBoardingDate}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Client;
