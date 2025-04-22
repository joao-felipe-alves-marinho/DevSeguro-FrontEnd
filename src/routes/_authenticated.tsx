import { createFileRoute, redirect } from '@tanstack/react-router';
import { BaseLayout } from '../shared/layouts/BaseLayout';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' });
    }
  },
  component: BaseLayout,
});