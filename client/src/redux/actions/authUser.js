import { USER_AUTH, USER_LOGOUT } from './actionTypes';

export const authUser = (data) => {
  return {
    type: USER_AUTH,
    payload: {
      ...data,
    },
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
