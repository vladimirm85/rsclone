export const emailValidator = (
  regEmail: string,
  setEmailValidatorError: (email: string) => void,
) => {
  const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  let count = 0;

  if (regEmail) {
    if (!emailReg.test(regEmail)) {
      setEmailValidatorError('Please enter a valid email.');
      count += 1;
    }
  } else {
    setEmailValidatorError('Enter email');
    count += 1;
  }

  return count === 0;
};

export const passValidator = (
  regPassword: string,
  regRepeatPassword: string,
  setPassValidatorError: (pass: string) => void,
  setRepeatPassValidatorError: (pass: string) => void,
) => {
  const passReg = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*/;
  let count = 0;

  if (regPassword) {
    if (!passReg.test(regPassword)) {
      setPassValidatorError(
        'The password must be at least 8 characters long and contain numbers and capital letters.',
      );
      count += 1;
    }
  } else {
    setPassValidatorError('Enter password.');
    count += 1;
  }

  if (regRepeatPassword) {
    if (regPassword !== regRepeatPassword) {
      setRepeatPassValidatorError('Passwords do not match.');
      count += 1;
    }
  } else {
    setRepeatPassValidatorError('Repeat password');
    count += 1;
  }

  return count === 0;
};
