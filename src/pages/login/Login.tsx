import { Alert, Button, CircularProgress, Icon, InputAdornment, Paper, Stack, Typography, useTheme } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { z } from 'zod';

import { ILoginPayload } from '../../shared/types/Types';
import { CustomLink } from '../../shared/components/customLinkComponents/CustomLink';
import { useLogin } from '../../shared/queries/authQueries/AuthQueries';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

const loginSchema = z.object({
  username: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('O e-mail precisa ser válido'),
  password: z.string().nonempty('A senha é obrigatória'),
});


export const Login = () => {
  const login = useLogin();
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState: { isDirty, isValid } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });

  const onSubmit = async (data: ILoginPayload) => {
    login.mutate(data, {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ['authenticated-user']
        });
      }
    });
  };

  login.isSuccess && navigate({ to: '/home' });

  return (
    <Stack
      borderRadius={4}
      direction='row'
      component={Paper}
      elevation={24}
      sx={{ mt: 16, width: theme.spacing(105), height: 488, mx: 'auto' }}
    >
      <Stack
        gap={2}
        sx={{ p: 4 }}
        flex={1}
        mx={2}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        justifyContent='space-between'
      >
        <Typography textAlign='center' variant='h3' fontWeight='bold' >Login</Typography>
        {login.isError && <Alert severity='error' variant='filled'>Credenciais Inválidas</Alert>}
        {login.isSuccess && <Alert severity='success' variant='filled'>Login efetuado com sucesso</Alert>}
        <Stack gap={3} justifyContent='center'>
          <TextFieldElement
            name='username'
            label='E-mail'
            placeholder='Digite seu e-mail'
            type='email'
            control={control}
            disabled={login.isPending}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon>person</Icon>
                  </InputAdornment>
                )
              }
            }}
          />

          <PasswordElement
            name='password'
            label='Senha'
            placeholder='Digite sua senha'
            control={control}
            disabled={login.isPending}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon>lock</Icon>
                  </InputAdornment>
                )
              }
            }}
          />

        </Stack>
        <Stack gap={2}>
          {/* <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <CustomLink to='/redefinir-senha' >Esqueceu a senha?</CustomLink>
                    </Stack> */}
          <Button
            type='submit'
            sx={{ fontSize: '1.1rem' }}
            disabled={!isDirty || !isValid || login.isPending}
          >
            {login.isPending ? <CircularProgress /> : 'Entrar'}
          </Button>
          <Typography textAlign='center'>Não tem uma conta? <CustomLink to='/register'>Cadastre-se</CustomLink></Typography>
        </Stack>
      </Stack>
    </Stack >
  );
};