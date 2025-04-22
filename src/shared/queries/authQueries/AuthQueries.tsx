import { getMeUser, loginUser, logoutUser } from '../../services/api/authService/AuthService';
import { configureAuth } from 'react-query-auth';
import { ILoginPayload, IUser } from '../../types/Types';

export const { useUser, useLogin, useLogout } = configureAuth({
  userFn: () => getMeUser(),
  loginFn: (credentials: ILoginPayload) => loginUser(credentials),
  logoutFn: () => logoutUser(),
  registerFn: () => Promise.resolve({} as IUser),
});