import { AppBar, Box, Container, Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { CustomButton } from '../components';
import { useUser } from '../queries/authQueries/AuthQueries';


export const BaseLayout = () => {
  const user = useUser().data;

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
              <CustomButton
                to='/perfil'
                sx={{ color: 'white' }}
                variant='outlined'
              >
                Perfil
              </CustomButton>
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