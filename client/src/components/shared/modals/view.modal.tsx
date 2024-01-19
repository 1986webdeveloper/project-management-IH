import { Button, Modal } from "antd";
import { ReactNode } from "react";

type ViewModalProps = {
  children: ReactNode;
  open: boolean;
  onSubmit: (e: any) => void;
  handleCancel: () => void;
  loading: boolean;
  error: any;
  checkObject: any;
  title: string;
  //   SubmitButtonText: string;
};

const ViewModal = ({
  children,
  handleCancel,
  loading,
  onSubmit,
  open,
  title,
}: //   SubmitButtonText,
ViewModalProps) => {
  return (
    <Modal
      open={open}
      title={<span className="mb-10 text-blue-950">{title}</span>}
      //   onOk={onSubmit}
      width={800}
      onCancel={handleCancel}
      cancelButtonProps={{ danger: true, type: "primary" }}
      footer={<button>Close</button>}
    >
      {children}
    </Modal>
  );
};

export default ViewModal;
