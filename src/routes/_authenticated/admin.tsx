import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: ({ context }) => {
    if (!context.user.is_superuser) {
      throw redirect({ to: '/home' });
    }
  },
  component: RouteComponent,
});


function RouteComponent() {
  return <div>WIP! YOU ARE A ADMIN</div>;
}
