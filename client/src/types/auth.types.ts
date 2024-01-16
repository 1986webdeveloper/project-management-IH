export interface UserLogInDTO {
  email: string;
  password: string;
}

export interface UserDTO {
  name: string;
  email: string;
  password?: string;
  designation: string;
  role: string;
  _id?: string;
  profile_Picture?: string;
  date_of_birth: string;
  department: string;

  // ui Types
  [key: string]: any;
}

export interface ResetPassDTO {
  oldPassword: string;
  newPassword: string;
}
