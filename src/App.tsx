import { Button, Stack, Container, Typography, Alert } from '@mui/material'
import { Box, Paper } from '@mui/material';
import { PasswordElement, PasswordRepeatElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Grid from '@mui/material/Grid';
import { useState } from 'react';


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



function App() {
  const [alert, setAlert] = useState<{ message: string; severity: 'error' | 'info' | 'success' | 'warning' | undefined }>({ message: '', severity: undefined });

  const { control, handleSubmit, formState: { isDirty, isValid } } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(registerSchema),
    mode: 'onTouched'
  })

  const onSubmit = (data: RegisterFormValues) => {
    fetch('http://127.0.0.1:8000/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status === 200) {
          setAlert({ message: 'Cadastro realizado com sucesso', severity: 'success' });
        } else {
          const errorData = await response.json();
          if (errorData?.detail?.[0]?.msg) {
            const fullMessage = errorData.detail[0].msg.split(',').slice(1).join(',').trim();
            setAlert({ message: fullMessage, severity: 'error' });
          } else {
            setAlert({ message: 'Erro desconhecido ao cadastrar usuário', severity: 'error' });
          }
        }
      })
      .catch(() => {
        setAlert({ message: 'Erro ao cadastrar usuário', severity: 'error' });
      });
  }

  return (
    <Container>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" marginTop={10}>
        <Stack
          component={Paper}
          elevation={12}
          width={400}
          p={4}
        >
          <Grid container spacing={2}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid size={12}>
              <Typography variant="h2" gutterBottom align="center">
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
            <Grid size={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={!isDirty || !isValid}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container >
  )
}

export default App
