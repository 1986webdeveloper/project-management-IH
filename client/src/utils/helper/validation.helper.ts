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

export const inputFieldValidation = (data: any, setError: (e: any) => void) => {
  const errors: any = {};
  console.log(data, "----5555%%%");

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
  if (!data.clientId.clientName) {
    errors.clientId = "Empty field is not allow.";
  }
  if (!data.reportingManager.name) {
    errors.reportingManager = "Empty field is not allow.";
  }
  if (!data.status) {
    errors.status = "Please select a valid Status.";
  }
  if (!data.priority) {
    errors.priority = "Please select a valid Priority.";
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
