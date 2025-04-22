import { useSuspenseQuery } from '@tanstack/react-query';
import { listPosts } from '../../shared/queries/authQueries/Queires';
import { IPost } from '../../shared/types/Types';
import { Stack, Typography } from '@mui/material';

export const Home = () => {
  const { data: posts, isRefetching, isRefetchError } = useSuspenseQuery(listPosts);
  return (
    <Stack spacing={2} sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Posts
      </Typography>
      {isRefetching && <Typography variant="body1">Loading...</Typography>}
      {isRefetchError && <Typography variant="body1">Error loading posts</Typography>}
      {!isRefetching && !isRefetchError && posts?.length === 0 && (
        <Typography variant="body1">No posts available</Typography>
      )}
      {posts?.map((post: IPost) => (
        <Stack key={post.id} spacing={1} sx={{ border: '1px solid #ccc', padding: 2 }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body1">{post.content}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};