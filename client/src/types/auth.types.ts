import { ClientDTO } from "./fieldTypes";

export interface UserLogInDTO {
  email: string;
  password: string;
}

export interface UserDTO {
  name: string;
  email: string;
  password: string;
  designation: string;
  role: string;
  _id?: string;
  clients?: [ClientDTO];
}

export interface ResetPassDTO {
  oldPassword: string;
  newPassword: string;
}
