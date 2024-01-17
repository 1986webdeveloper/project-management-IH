/* eslint-disable @typescript-eslint/no-explicit-any */
const filter =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
const minChar = /^(?=.{4,50}$)\w+(?: \w+)*$/;
const alphabets = /^[a-zA-Z-][a-zA-Z -]*$/;
// const spaceValidate = /^\w+( \w+)*$/;

export const validationHelper = (user: any, setError: (e: any) => void) => {
	const errors: any = {};
	const filter =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// const passwordVal =
	//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

	if (!user.email) {
		errors.email = 'Please enter your email.';
	} else if (!filter.test(user.email)) {
		errors.email = 'Please enter a valid email.';
	}

	// if (!user?.email) {
	//   errors.email = "Please enter your email.";
	// }

	if (!user.password) {
		errors.password = 'Please enter your password.';
	}
	// else if (!passwordVal.test(user.password)) {
	//   errors.password = "Please enter a strong password.";
	// }

	if (Object.values(errors).length > 0) {
		setError(errors);
		return false;
	}

	return true;
};

export const taskInputValidation = (data: any, setError: (e: any) => void, isEdit?: boolean) => {
	const errors: any = {};

	for (const property in data) {
		switch (property) {
			case 'title':
				if (!data.title) {
					errors.title = 'Please enter your Title.';
				}
				break;
			case 'description':
				if (!data.description) {
					errors.description = 'Please enter your Description.';
				}
				break;
			case 'reportingManager':
				if (isEdit && isEdit ? !data?.reportingManager?.name : !data?.reportingManager) {
					errors.reportingManager = 'Empty field is not allow.';
				}
				break;
			case 'projectId':
				if (isEdit && isEdit ? !data?.projectId?.projectName : !data?.projectId) {
					errors.projectId = 'Empty field is not allow.';
				}
				break;
			case 'reportedBy':
				if (!data.reportedBy || data.reportedBy.length <= 0) {
					errors.reportedBy = 'Please select at least 1 value.';
				}
				break;
			case 'startDate':
				if (!data.startDate) {
					errors.startDate = 'Please select a valid StartDate.';
				}
				break;
			case 'endDate':
				if (!data.endDate) {
					errors.endDate = 'Please select a valid EndDate.';
				}
				break;
			case 'status':
				if (!data.status) {
					errors.status = 'Please select a valid Status.';
				}
				break;
			case 'priority':
				if (!data.priority) {
					errors.priority = 'Please select a valid Priority.';
				}
				break;
			default:
				break;
		}
	}

	if (Object.values(errors).length > 0) {
		setError(errors);
		return { errors };
	}

	return { errors };
};
export const userInputValidation = (data: any, setError: (e: any) => void) => {
	const errors: any = {};

	for (const property in data) {
		switch (property) {
			case 'email':
				if (!data.email) {
					errors.email = 'Please enter your email.';
				} else if (!filter.test(data.email)) {
					errors.email = 'Please enter a valid email.';
				} else {
					delete errors.email;
				}
				break;
			case 'date_of_birth':
				if (!data.date_of_birth) {
					errors.date_of_birth = 'Please select a valid DOB.';
				} else {
					delete errors.date_of_birth;
				}
				break;
			case 'department':
				if (!data.department) {
					errors.department = 'Please select a valid Department.';
				} else {
					delete errors.department;
				}
				break;
			case 'role':
				if (!data.role) {
					errors.role = 'Please select a valid Role.';
				} else {
					delete errors.role;
				}
				break;
			case 'name':
				if (!data.name) {
					errors.name = 'Please enter your Name.';
				} else if (!minChar.test(data.name)) {
					errors.name = 'Please enter proper name';
				}
				//  else if (!spaceValidate.test(data.name)) {
				// 	errors.name = 'Please enter valid name';
				// }
				else if (!alphabets.test(data.name)) {
					errors.name = 'Name should be only alphabetic.';
				} else {
					delete errors.name;
				}
				break;
			case 'designation':
				if (!data.designation) {
					errors.designation = 'Please enter your Designation.';
				} else {
					delete errors.designation;
				}
				break;
			default:
				break;
		}
	}

	if (Object.values(errors).length > 0) {
		setError(errors);
		return { errors };
	}

	return { errors };
};
export const clientInputValidation = (data: any, setError: (e: any) => void) => {
	const errors: any = {};

	for (const property in data) {
		switch (property) {
			case 'email':
				if (!data.email) {
					errors.email = 'Please enter your email.';
				} else if (!filter.test(data.email)) {
					errors.email = 'Please enter a valid email.';
				} else {
					delete errors.email;
				}
				break;
			case 'clientName':
				if (!data.clientName) {
					errors.clientName = 'Please enter your ClientName.';
				}
				break;
			case 'clientName':
				if (!data.clientName) {
					errors.clientName = 'Please enter client Name.';
				} else if (!minChar.test(data.clientName)) {
					errors.clientName = 'Please enter proper client name';
				}
				// else if (!spaceValidate.test(data.clientName)) {
				// 	errors.clientName = 'Please enter valid client name';
				// }
				else if (!alphabets.test(data.clientName)) {
					errors.clientName = 'Client name should be only alphabetic.';
				} else {
					delete errors.clientName;
				}
				break;
			case 'industry':
				if (!data.industry) {
					errors.industry = 'Please enter your Industry.';
				} else if (!minChar.test(data.industry)) {
					errors.industry = 'Please enter proper industry name';
				}
				//  else if (!spaceValidate.test(data.industry)) {
				// 	errors.industry = 'Please enter valid industry name';
				// }
				else if (!alphabets.test(data.industry)) {
					errors.industry = 'Industry name should be only alphabetic.';
				} else {
					delete errors.industry;
				}
				break;
			case 'onBoardingDate':
				if (!data.onBoardingDate) {
					errors.onBoardingDate = 'Please select a valid OnBoardingDate.';
				}
				break;
			case 'managerList':
				if (!data.managerList || data.managerList.length <= 0) {
					errors.managerList = 'Please select at least 1 value.';
				}
				break;
			default:
				break;
		}
	}

	if (Object.values(errors).length > 0) {
		setError(errors);
		return { errors };
	}

	return { errors };
};
export const projectInputValidation = (data: any, setError: (e: any) => void, isEdit?: boolean) => {
	const errors: any = {};

	for (const property in data) {
		switch (property) {
			case 'projectName':
				if (!data.projectName) {
					errors.projectName = 'Please enter your ProjectName.';
				}
				break;
			case 'estimatedHours':
				if (!data.estimatedHours) {
					errors.estimatedHours = 'Please enter a valid EstimatedHours.';
				}
				break;
			case 'deadlineDate':
				if (!data.deadlineDate) {
					errors.deadlineDate = 'Please select a valid DeadlineDate.';
				}
				break;
			case 'startDate':
				if (!data.startDate) {
					errors.startDate = 'Please select a valid StartDate.';
				}
				break;
			case 'clientId':
				if (isEdit && isEdit ? !data?.clientId?.clientName : !data?.clientId) {
					errors.clientId = 'Empty field is not allowed .';
				}
				break;
			case 'status':
				if (!data.status) {
					errors.status = 'Please select a valid Status.';
				}
				break;
			case 'priority':
				if (!data.priority) {
					errors.priority = 'Please select a valid Priority.';
				}
				break;
			case 'reportingManager':
				if (isEdit && isEdit ? !data?.reportingManager?.name : !data?.reportingManager) {
					errors.reportingManager = 'Empty field is not allow.';
				}
				break;
			case 'assignedEmployeeList':
				if (!data.assignedEmployeeList || data.assignedEmployeeList.length <= 0) {
					errors.assignedEmployeeList = 'Please select at least 1 value.';
				}
				break;
			case 'technologyList':
				if (!data.technologyList || data.technologyList.length <= 0) {
					errors.technologyList = 'Please select at least 1 value.';
				}
				break;
			default:
				break;
		}
	}

	if (Object.values(errors).length > 0) {
		setError(errors);
		return { errors };
	}

	return { errors };
};
