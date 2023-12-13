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
