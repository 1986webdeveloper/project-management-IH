export interface UserLogInDTO {
  username: string;
  password: string;
}

export interface PreferenceDTO {
  companyName: string;
  companyId: string;
}

export interface UserDTO {
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  user_id: string;
  preference: PreferenceDTO[];
}
