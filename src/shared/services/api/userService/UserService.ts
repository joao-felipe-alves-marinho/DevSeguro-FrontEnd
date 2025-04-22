import { IPost, TCreatePost, TUpdateUser, TUser } from '../../../types/Types';
import Api from '../Api';

export const getMe = async () => {
  const response = await Api.get('/me');

  const data: TUser = response.data;
  return data;
};

export const updateMe = async (payload: TUpdateUser) => {
  const response = await Api.patch('/me/pessoa', payload);

  const data: TUser = response.data;
  return data;
};

export const deleteMe = async () => {
  await Api.delete('/me/pessoa');
};

export const getPostsMe = async () => {
  const response = await Api.get('/me/posts');

  const data: IPost[] = response.data;
  return data;
};

export const createPostMe = async (payload: TCreatePost) => {
  const response = await Api.post('/me/posts', payload);

  const data: IPost = response.data;
  return data;
};

export const getPostMe = async (post_id: number) => {
  const response = await Api.get(`/me/posts/${post_id}`);

  const data: IPost = response.data;
  return data;
};

export const updatePostMe = async (post_id: number, payload: TCreatePost) => {
  const response = await Api.patch(`/me/posts/${post_id}`, payload);

  const data: IPost = response.data;
  return data;
};

export const deletePostMe = async (post_id: number) => {
  await Api.delete(`/me/posts/${post_id}`);
};

