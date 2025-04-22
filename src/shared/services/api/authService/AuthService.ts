import Api from '../Api';
import { ILoginPayload, ILoginResponse, ILogoutResponse, TRefreshTokenResponse, IUser, TCreateUser } from '../../../types/Types';

export const register = async (payload: TCreateUser) => {
  await Api.post('/register', payload, { withCredentials: true });
};

export const getMeUser = async () => {
  const response = await Api.get<IUser>('/auth/me');
  const data: IUser = response.data;
  return data;
};

export const loginUser = async (payload: ILoginPayload) => {
  const response = await Api.post('/auth/login', payload, { withCredentials: true });
  const data: ILoginResponse = response.data;
  localStorage.setItem('accessToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);
  return data.user;
};

export const logoutUser = async () => {
  const response = await Api.post('/auth/logout', {}, { withCredentials: true });
  delete Api.defaults.headers.common['Authorization'];
  const data: ILogoutResponse = response.data;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return data;
};

export const refreshToken = async (payload: { refresh: string }) => {
  const response = await Api.post('/auth/refresh', payload, { withCredentials: true });

  const data: TRefreshTokenResponse = response.data;
  localStorage.setItem('accessToken', data.access);
  return data.access;
};

export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  delete Api.defaults.headers.common['Authorization'];
};

// TODO: Change and Reset Password