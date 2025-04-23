import { createFileRoute } from '@tanstack/react-router';
import { Home } from '../pages';
import { ListPosts } from '../shared/queries/authQueries/Queires';

export const Route = createFileRoute('/home')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(ListPosts);
  },
  component: Home,
});
