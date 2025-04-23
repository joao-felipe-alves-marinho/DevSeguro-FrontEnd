import { Skeleton, Stack } from '@mui/material';
import { Suspense } from 'react';
import { UserInfo } from './UserInfo';
import { UserPosts } from './UserPosts';

export const Profile = () => {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <Stack spacing={2}>
        <UserInfo />
        <UserPosts />
      </Stack>
    </Suspense>

  );
};

const ProfileSkeleton = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant='rounded' height={400} />
      <Skeleton variant='rounded' height={400} />
    </Stack>
  );
};