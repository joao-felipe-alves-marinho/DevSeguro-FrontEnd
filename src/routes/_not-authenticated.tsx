import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_not-authenticated')({
  beforeLoad: ({ context }) => {
    if (!!context.user) {
      throw redirect({ to: '/home' });
    }
  }
});