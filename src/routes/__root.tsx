import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { IUser } from '../shared/types/Types';


export const Route = createRootRouteWithContext<{ queryClient: QueryClient, user: IUser }>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});