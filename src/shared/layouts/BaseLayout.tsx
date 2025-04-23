import { AppBar, Box, Button, Container, Stack } from '@mui/material';
import { Outlet, useNavigate, useRouteContext } from '@tanstack/react-router';
import { CustomButton } from '../components';
import { useLogout } from '../queries/authQueries/AuthQueries';
import { useQueryClient } from '@tanstack/react-query';


export const BaseLayout = () => {
  const context = useRouteContext({ from: '__root__'});
  const user = context.user;
  const logout = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['authenticated-user'] });
      }
    });
  };

  logout.isSuccess && navigate({ to: '/login' });

  return (
    <Stack gap={2}>
      <AppBar position='static' >
        <Container maxWidth='lg' >
          <Box
            display='flex'
            flexGrow={1}
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack direction='row' gap={3}>
              <CustomButton
                to='/home'
                sx={{ color: 'white' }}
                variant='outlined'
              >
                Home
              </CustomButton>
              {user ? (
                <CustomButton
                  to='/profile'
                  sx={{ color: 'white' }}
                  variant='outlined'
                >
                  Profile
                </CustomButton>
              ) : (
                <CustomButton
                  to='/login'
                  sx={{ color: 'white' }}
                  variant='outlined'
                >
                  Login
                </CustomButton>
              )}
              {user && (
                <Button
                  sx={{ color: 'white' }}
                  variant='outlined'
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
              {user?.is_superuser && (
                <CustomButton
                  to='/admin'
                  sx={{ color: 'white' }}
                  variant='outlined'
                >
                  Admin
                </CustomButton>
              )}
            </Stack>
          </Box>
        </Container>
      </AppBar>
      <Container>
        <Outlet />
      </Container >
    </Stack>
  );
};