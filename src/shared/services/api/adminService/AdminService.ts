import { IPost, TUpdateUser, TUser } from '../../../types/Types';
import Api from '../Api';

export const getUsers = async () => {
  const response = await Api.get('/admin/users');

  const data: TUser[] = response.data;
  return data;
};

export const getUser = async (user_id: number) => {
  const response = await Api.get(`/admin/users/${user_id}`);

  const data: TUser = response.data;
  return data;
};

export const updateUser = async (user_id: number, payload: TUpdateUser) => {
  const response = await Api.patch(`/admin/users/${user_id}`, payload);

  const data: TUser = response.data;
  return data;
};

export const deleteUser = async (user_id: number) => {
  await Api.delete(`/admin/users/${user_id}`);
};

export const getPosts = async () => {
  const response = await Api.get('/admin/posts');

  const data: IPost[] = response.data;
  return data;
};

export const getPost = async (post_id: number) => {
  const response = await Api.get(`/admin/posts/${post_id}`);

  const data: IPost = response.data;
  return data;
};

export const updatePost = async (post_id: number, payload: Partial<IPost>) => {
  const response = await Api.patch(`/admin/posts/${post_id}`, payload);

  const data: IPost = response.data;
  return data;
};

export const deletePost = async (post_id: number) => {
  await Api.delete(`/admin/posts/${post_id}`);
};
