export const apiURL =
  process.env.REACT_APP_BACK_BASE_URL || 'http://localhost:3000';
export const google = `${apiURL}/auth/google`;
export const github = `${apiURL}/auth/github`;
export const facebook = `${apiURL}/auth/facebook`;
