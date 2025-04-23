import { createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { IUser } from '../shared/types/Types';
import { BaseLayout } from '../shared/layouts/BaseLayout';


export const Route = createRootRouteWithContext<{ queryClient: QueryClient, user: IUser }>()({
  component: BaseLayout,
});