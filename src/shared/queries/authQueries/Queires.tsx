import { queryOptions } from '@tanstack/react-query';
import { getPosts } from '../../services/api/postService/PostService';

export const listPosts = queryOptions({
  queryKey: ['POSTS'],
  queryFn: async () => {
    return await getPosts();
  }
});