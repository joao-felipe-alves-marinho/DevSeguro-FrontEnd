import { createFileRoute } from '@tanstack/react-router';
import { listPosts } from '../../shared/queries/authQueries/Queires';
import { Home } from '../../pages';

export const Route = createFileRoute('/_authenticated/home')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(listPosts);
  },
  component: Home,
});
