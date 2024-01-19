import { UserViewField } from "@/constants/viewTable.constants";
import { UserDTO } from "@/types/auth.types";
import { Modal } from "antd";

type ViewModalProps = {
  open: boolean;
  onSubmit: (e: any) => void;
  handleCancel: () => void;
  loading: boolean;
  error: any;
  checkObject: any;
  title: string;
  selectedRow: UserDTO;
};

const ViewModal = ({
  selectedRow,
  handleCancel,
  open,
  title,
}: ViewModalProps) => {
  // const allowed = ["name", "email", "role"];
  // const filteredField: UserDTO = Object.keys(selectedRow)
  //   .filter((key) => allowed.includes(key))
  //   .reduce((obj: any, key: any) => {
  //     obj[key] = selectedRow[key];
  //     return obj;
  //   }, {});
  const filterUserObject = (
    selectedRow: { [x: string]: any; hasOwnProperty: (arg0: any) => any },
    fields: any[],
  ) => {
    const filteredObject = {} as any;
    fields.forEach((field: { key: any; label: any }) => {
      const { key, label } = field;
      if (selectedRow.hasOwnProperty(key)) {
        filteredObject[label] = selectedRow[key];
      }
    });

    return filteredObject;
  };
  const filteredObject: UserDTO = filterUserObject(selectedRow, UserViewField);

  return (
    <Modal
      open={open}
      title={<span className="mb-10 text-blue-950">{title}</span>}
      //   onOk={onSubmit}
      width={800}
      onCancel={handleCancel}
      cancelButtonProps={{ danger: true, type: "primary" }}
      footer
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3">
          {Object.entries(filteredObject).map(([key, value]) => (
            <div className="flex" key={key}>
              <label>{`${key}:`}</label>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
