import { Modal } from "antd";
import AntCard from "@/components/elements/card/card.element";
import AntTable from "@/components/elements/table/table.element";
import { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import { ClientDTO } from "@/types/fieldTypes";
import { ChangeEvent, useEffect, useState } from "react";
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
import { clientInputValidation } from "@/utils/helper/validation.helper";
import { UserDTO } from "@/types/auth.types";

interface ClientProps {
  clientList: ClientDTO[];
  managerList: UserDTO[];
}

const Client = ({ clientList, managerList }: ClientProps) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [clientDetails, setClientDetails] = useState(initClient);
  const dispatch = useDispatch();
  const { GetUserList } = UserService({
    dispatch,
    setLoading,
  });
  const { DeleteClient, CreateClient, UpdateClient } = ClientService({
    dispatch,
    setLoading,
  });
  const { ModuleList } = useList();
  const [error, setError] = useState({
    clientName: "",
    onBoardingDate: "",
    industry: "",
    managerList: "",
    email: "",
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
  useEffect(() => {
    const { errors } = clientInputValidation(clientDetails, setError);
    setError({ ...error, [fieldName]: errors[fieldName] });
  }, [clientDetails, fieldName]);

  // *handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldName(name);
    setClientDetails({ ...clientDetails, [name]: value });
  };
  const handleDateSelect = (
    date: Dayjs | null,
    dateString: string,
    id: string,
  ) => {
    setFieldName(id);
    setClientDetails({ ...clientDetails, [id]: dateString });
  };
  const handleMultiSelect = (e: any, name: string) => {
    setFieldName(name);
    setClientDetails({ ...clientDetails, [name]: [...e] });
  };

  // const minDate = dayjs().subtract(15, "years").startOf("day");
  // const maxDate = dayjs().add(1, "month").endOf("day");
  // *modal actions
  const showModal = () => {
    setClientDetails(initClient);
    setOpen(true);
  };
  const handleCancel = () => {
    setFieldName("");
    setOpen(false);
    setEdit(false);
  };
  // *FormActions
  const onSubmit = (e: any) => {
    e.preventDefault();
    const { errors } = clientInputValidation(clientDetails, setError);

    if (Object.values(errors).some((value) => value !== undefined)) {
      if (!isEdit) {
        CreateClient({
          payload: clientDetails,
          setOpen: setOpen,
        });
      }
      if (isEdit) {
        UpdateClient({
          payload: clientDetails,
          setIsEdit: setEdit,
          setOpen: setOpen,
        });
      }
    }
  };
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
            {isEdit ? "Edit Project" : "Create Client"}
          </span>
        }
        onOk={onSubmit}
        width={800}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-950", loading: loading }}
        okText={isEdit ? "Update" : "Save"}
        cancelButtonProps={{ danger: true, type: "primary" }}
      >
        <div className="grid py-7 grid-rows-3 text-blue-950 grid-flow-col items-start w-[100%]">
          <AntInput
            name={"clientName"}
            label="Client Name"
            placeHolder={"Enter Your Client Name"}
            value={clientDetails.clientName}
            onChange={handleChange}
            onFocus={() => setFieldName("clientName")}
            error={error.clientName}
          />
          <AntInput
            name={"industry"}
            label="Industry"
            placeHolder={"Enter Your expertise field"}
            value={clientDetails.industry}
            onChange={handleChange}
            onFocus={() => setFieldName("industry")}
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
            onFocus={() => {
              setFieldName("managerList");
              return GetUserList({ role: USER_ROLES.MANAGER });
            }}
            optionLabel={"label"}
            error={error.managerList}
          />
          <AntInput
            name={"email"}
            value={clientDetails.email}
            label={"Email"}
            placeHolder={"Enter Your Email"}
            onChange={handleChange}
            disabled={loading ? true : false}
            onFocus={() => setFieldName("email")}
            error={error.email}
          />
          <AntDatePicker
            name={"onBoardingDate"}
            width="330px"
            value={
              clientDetails?.onBoardingDate?.length > 0
                ? clientDetails?.onBoardingDate
                : ""
            }
            label="Onboarding Date"
            onChange={(date, dateString) =>
              handleDateSelect(date, dateString, "onBoardingDate")
            }
            transformStyle="translate(1%, 170%)"
            // minDate={minDate.format()}
            // maxDate={maxDate.format()}
            applyAgeValidation={false}
            onFocus={() => setFieldName("onBoardingDate")}
            error={error.onBoardingDate}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Client;
