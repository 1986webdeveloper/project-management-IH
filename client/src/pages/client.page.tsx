import { useEffect, useState } from "react";
import { initClient } from "@/constants/general.constants";
import { DEFAULT_PIC_URL } from "@/config/keys.config";
import AntCard from "@/components/elements/card/card.element";
import CreateButton from "@/components/elements/buttons/createButton.element";
import { ClientDTO } from "@/types/fieldTypes";
import ClientTable from "@/components/shared/tables/client.table";
import { errorToastHelper } from "@/utils/helper/toast.helper";
import { useDispatch } from "react-redux";
import ClientService from "@/utils/service/client.service";
import FormModal from "@/components/shared/modals/form.modal";
import { clientInputValidation } from "@/utils/helper/validation.helper";
import ClientForm from "@/components/shared/forms/client.form";
import { UserDTO } from "@/types/auth.types";

interface clientProps {
  clientList: ClientDTO[];
  managerList: UserDTO[];
}
const Client = ({ clientList, managerList }: clientProps) => {
  const [imgURL, setImgURL] = useState("");
  const [clientDetails, setClientDetails] = useState(initClient);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [error, setError] = useState({
    clientName: "",
    onBoardingDate: "",
    industry: "",
    managerList: "",
    email: "",
  });

  const dispatch = useDispatch();
  const { DeleteClient, CreateClient, UpdateClient } = ClientService({
    dispatch,
    setLoading,
  });
  //   useEffect(() => {
  //     const { errors } = clientInputValidation(clientDetails, setError);
  //     setError({ ...error, [fieldName]: errors[fieldName] });
  //   }, [clientDetails, fieldName]);
  useEffect(() => {
    setClientDetails({
      ...clientDetails,
      client_picture: imgURL ? imgURL : DEFAULT_PIC_URL,
    });
  }, []);

  // *FormActions
  const onEdit = (data: ClientDTO) => {
    if (data.client_picture) {
      setImgURL(data.client_picture);
    }
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
  // *modal actions
  const showModal = () => {
    setClientDetails(initClient);
    setOpen(true);
  };
  const handleCancel = () => {
    setImgURL("");
    setFieldName("");
    setClientDetails(initClient);
    setOpen(false);
    setEdit(false);
    setError({} as any);
  };
  // *FormActions
  const onSubmit = (e: any) => {
    e.preventDefault();
    const { errors } = clientInputValidation(clientDetails, setError);
    if (!Object.values(errors).some((value) => value)) {
      if (!isEdit) {
        CreateClient({
          payload: clientDetails,
          setOpen: setOpen,
        });
        setError({} as any);
      }
      if (isEdit) {
        UpdateClient({
          payload: clientDetails,
          setIsEdit: setEdit,
          setOpen: setOpen,
        });
        setError({} as any);
      }
    } else {
      errorToastHelper("Please fill the details properly.");
    }
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
        <ClientTable
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
          clientList={clientList}
        />
      </AntCard>

      <FormModal
        open={open}
        onSubmit={onSubmit}
        handleCancel={handleCancel}
        loading={loading}
        error={error}
        checkObject={clientDetails}
        title={isEdit ? "Edit Client" : "Create Client"}
        SubmitButtonText={isEdit ? "Update" : "Save"}
      >
        <ClientForm
          clientDetails={clientDetails}
          setClientDetails={setClientDetails}
          imgURL={imgURL}
          setImgURL={setImgURL}
          error={error}
          setError={setError}
          setFieldName={setFieldName}
          loading={loading}
          fieldName={fieldName}
          isEdit={isEdit}
          managerList={managerList}
          setLoading={setLoading}
        />
      </FormModal>
    </div>
  );
};

export default Client;
