/* eslint-disable @typescript-eslint/no-explicit-any */
export const validationHelper = (user: any, setError: (e: any) => void) => {
  const errors: any = {};
  const filter =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // const passwordVal =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

  if (!user.email) {
    errors.email = "Please enter your email.";
  } else if (!filter.test(user.email)) {
    errors.email = "Please enter a valid email.";
  }

  // if (!user?.email) {
  //   errors.email = "Please enter your email.";
  // }

  if (!user.password) {
    errors.password = "Please enter your password.";
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

export const taskInputValidation = (
  data: any,
  setError: (e: any) => void,
  isEdit: boolean,
) => {
  const errors: any = {};

  if (!data.title) {
    errors.title = "Please enter your Title.";
  }
  if (!data.description) {
    errors.description = "Please enter your Description.";
  }
  if (
    isEdit && isEdit ? !data?.reportingManager?.name : !data?.reportingManager
  ) {
    errors.reportingManager = "Empty field is not allow.";
  }
  if (isEdit && isEdit ? !data?.projectId?.projectName : !data?.projectId) {
    errors.projectId = "Empty field is not allow.";
  }
  if (!data.reportedBy || data.reportedBy.length <= 0) {
    errors.reportedBy = "Please select at least 1 value.";
  }
  if (!data.startDate) {
    errors.startDate = "Please select a valid StartDate.";
  }
  if (!data.endDate) {
    errors.endDate = "Please select a valid EndDate.";
  }
  if (!data.status) {
    errors.status = "Please select a valid Status.";
  }
  if (!data.priority) {
    errors.priority = "Please select a valid Priority.";
  }

  if (Object.values(errors).length > 0) {
    setError(errors);
    return false;
  }

  return true;
};
export const userInputValidation = (data: any, setError: (e: any) => void) => {
  const errors: any = {};
  const filter =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!data.email) {
    errors.email = "Please enter your email.";
  } else if (!filter.test(data.email)) {
    errors.email = "Please enter a valid email.";
  }
  if (!data.date_of_birth) {
    errors.date_of_birth = "Please select a valid DOB.";
  }
  if (!data.department) {
    errors.department = "Please select a valid Department.";
  }
  if (!data.role) {
    errors.role = "Please select a valid Role.";
  }
  if (!data.name) {
    errors.name = "Please enter your Name.";
  }
  if (!data.designation) {
    errors.designation = "Please enter your Designation.";
  }

  if (Object.values(errors).length > 0) {
    setError(errors);
    return false;
  }

  return true;
};
export const clientInputValidation = (
  data: any,
  setError: (e: any) => void,
) => {
  const errors: any = {};

  if (!data.clientName) {
    errors.clientName = "Please enter your ClientName.";
  }
  if (!data.industry) {
    errors.industry = "Please enter your Industry.";
  }
  if (!data.onBoardingDate) {
    errors.onBoardingDate = "Please select a valid OnBoardingDate.";
  }
  if (!data.managerList || data.managerList.length <= 0) {
    errors.managerList = "Please select at least 1 value.";
  }

  if (Object.values(errors).length > 0) {
    setError(errors);
    return false;
  }

  return true;
};
export const projectInputValidation = (
  data: any,
  setError: (e: any) => void,
  isEdit?: boolean,
) => {
  const errors: any = {};
  console.log(data, "%%%%$$$$####");

  if (!data.projectName) {
    errors.projectName = "Please enter your ProjectName.";
  }
  if (!data.estimatedHours) {
    errors.estimatedHours = "Please enter a valid EstimatedHours.";
  }
  if (!data.deadlineDate) {
    errors.deadlineDate = "Please select a valid DeadlineDate.";
  }
  if (!data.startDate) {
    errors.startDate = "Please select a valid StartDate.";
  }
  if (isEdit && isEdit ? !data?.clientId?.clientName : !data?.clientId) {
    errors.clientId = "Empty field is not allowed .";
  }
  if (!data.status) {
    errors.status = "Please select a valid Status.";
  }
  if (!data.priority) {
    errors.priority = "Please select a valid Priority.";
  }
  if (
    isEdit && isEdit ? !data?.reportingManager?.name : !data?.reportingManager
  ) {
    errors.reportingManager = "Empty field is not allow.";
  }
  if (!data.assignedEmployeeList || data.assignedEmployeeList.length <= 0) {
    errors.assignedEmployeeList = "Please select at least 1 value.";
  }
  if (!data.technologyList || data.technologyList.length <= 0) {
    errors.technologyList = "Please select at least 1 value.";
  }

  if (Object.values(errors).length > 0) {
    setError(errors);
    return false;
  }

  return true;
};
