import { IPost } from '../../../types/Types';
import Api from '../Api';

export const getPosts = async () => {
  const response = await Api.get('/posts');

  const data: IPost[] = response.data;
  return data;
};

export const getPost = async (post_id: number) => {
  const response = await Api.get(`/posts/${post_id}`);

  const data: IPost = response.data;
  return data;
};