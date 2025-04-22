import { CssBaseline, LinearProgress, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen';
import { useUser } from './shared/queries/authQueries/AuthQueries';
import Light from './shared/themes/Light';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      retry: 0,
      gcTime: 1000 * 60 * 5,
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
    user: undefined!,
  },
  defaultPendingComponent: () => <LinearProgress />,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const InnerApp = () => {
  const userQuery = useUser({ enabled: localStorage.getItem('accessToken') !== null });

  if (userQuery.isLoading) return <LinearProgress />;

  return (
    <RouterProvider router={router} context={{ queryClient, user: userQuery.data }} />
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={responsiveFontSizes(Light)}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </ThemeProvider>
  );
};