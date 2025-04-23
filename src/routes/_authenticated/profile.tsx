import { createFileRoute } from '@tanstack/react-router';
import { Profile } from '../../pages';
import { Me, MyPosts } from '../../shared/queries/authQueries/Queires';

export const Route = createFileRoute('/_authenticated/profile')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(MyPosts);
    queryClient.ensureQueryData(Me);
  },
  component: Profile,
});
