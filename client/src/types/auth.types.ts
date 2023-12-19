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
}

export interface ResetPassDTO {
	oldPassword: string;
	newPassword: string;
}
