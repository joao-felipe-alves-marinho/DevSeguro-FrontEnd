import { Button, Stack, Container, Typography, Alert, CircularProgress } from '@mui/material';
import { Box, Paper } from '@mui/material';
import { PasswordElement, PasswordRepeatElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { register } from '../../shared/services/api/authService/AuthService';
import { CustomLink } from '../../shared/components';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const registerSchema = z.object({
  username: z.string().min(3, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().min(1, 'Email é obrigatório').max(100, 'Email deve ter no máximo 100 caracteres').email('Email inválido'),
  password: z.string()
    .regex(passwordRegex, 'Senha deve ter pelo menos 8 caracteres, incluindo pelo menos um número e uma letra maiúscula'),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória')
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas devem coincidir',
  path: ['confirmPassword']
});

type RegisterFormValues = z.infer<typeof registerSchema>;


export const Register = () => {
  const [alert, setAlert] = useState<{ message: string; severity: 'error' | 'info' | 'success' | 'warning' | undefined }>({ message: '', severity: undefined });
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { isDirty, isValid } } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(registerSchema),
    mode: 'onTouched'
  });

  const onSubmit = async (payload: RegisterFormValues) => {
    try {
      setLoading(true);
      await register(payload);
      setAlert({ message: 'Cadastro realizado com sucesso', severity: 'success' });
    } catch (error: any) {
      if (error.response?.data?.detail?.[0]?.msg) {
        const fullMessage = error.response.data.detail[0].msg.split(',').slice(1).join(',').trim();
        setAlert({ message: fullMessage, severity: 'error' });
      } else {
        setAlert({ message: 'Erro desconhecido ao cadastrar usuário', severity: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" marginTop={10}>
        <Stack
          component={Paper}
          elevation={12}
          width={400}
          p={4}
        >
          <Grid container spacing={1}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid size={12}>
              <Typography textAlign='center' variant='h3' fontWeight='bold' gutterBottom>
                Cadastro
              </Typography>
            </Grid>

            {alert.message && (
              <Grid size={12}>
                <Alert severity={alert.severity}>
                  {alert.message}
                </Alert>
              </Grid>
            )}

            <Grid size={12}>
              <TextFieldElement
                name="username"
                label="Nome"
                placeholder="Digite seu nome"
                control={control}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextFieldElement
                name="email"
                label="Email"
                placeholder="Digite seu email"
                type="email"
                control={control}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <PasswordElement
                name="password"
                label="Senha"
                placeholder="Digite sua senha"
                control={control}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <PasswordRepeatElement
                name="confirmPassword"
                label="Confirmar Senha"
                placeholder="Confirme sua senha"
                control={control}
                passwordFieldName='password'
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid size={12} display='flex' flexDirection='column' gap={2}>
              <Button
                type='submit'
                disabled={!isDirty || !isValid || loading}
              >
                {loading ? <CircularProgress /> : 'Cadastrar'}
              </Button>
              <CustomLink textAlign='center' to='/login'>Voltar para login</CustomLink>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container >
  );
};
