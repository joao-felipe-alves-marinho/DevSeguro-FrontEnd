import { queryOptions } from '@tanstack/react-query';
import { getPosts } from '../../services/api/postService/PostService';
import { getMe, getPostsMe } from '../../services/api/userService/UserService';

export const ListPosts = queryOptions({
  queryKey: ['POSTS'],
  queryFn: async () => {
    return await getPosts();
  }
});

export const MyPosts = queryOptions({
  queryKey: ['POSTS', 'MY_POSTS'],
  queryFn: async () => {
    return await getPostsMe();
  }
});

export const Me = queryOptions({
  queryKey: ['ME'],
  queryFn: async () => {
    return await getMe();
  }
});