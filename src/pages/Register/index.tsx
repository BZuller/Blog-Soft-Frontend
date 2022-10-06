import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline, Grid, Link, Paper, TextField, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import { ImBug } from 'react-icons/im';
import { useHistory } from 'react-router-dom';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import UsersService from '../../services/users.service';
import ICreateUser from '../../interfaces/ICreateUser';

function Register(): React.ReactElement {
  const [fields, setFields] = useState<ICreateUser>({ name: '', email: '', username: '', password: '' });
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useHistory();
  const theme = createTheme({
    palette: {
      primary: { main: '#990011', light: '#FCF6F5FF', dark: '#730000' },
    },
  });

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    try {
      event.preventDefault();
      setLoader(true);
      const { name, email, username, password } = fields;
      await UsersService.createUser({ name, email, username, password });
      toastMsg(ToastType.Success, 'Cadastrado com sucesso!');
      setLoader(false);
      navigate.push('/');
    } catch {
      toastMsg(ToastType.Error, 'Ocorreu um erro ao cadastrar o novo usuário');
      setLoader(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        p={0}
        sx={{
          height: '100vh',
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ borderRadius: '3%' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ImBug fontSize={50} color="#990011" />
            <Typography component="h1" variant="h5" sx={{ marginTop: '5vh' }}>
              Sign up
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={fields.email}
                  onChange={(event) => setFields({ ...fields, email: event.target.value })}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Name"
                  type="name"
                  id="name"
                  value={fields.name}
                  onChange={(event) => setFields({ ...fields, name: event.target.value })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="username"
                  id="username"
                  value={fields.username}
                  onChange={(event) => setFields({ ...fields, username: event.target.value })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={fields.password}
                  onChange={(event) => setFields({ ...fields, password: event.target.value })}
                />
                <Button variant="contained" disabled={loader} fullWidth type="submit">
                  Sign up
                </Button>
              </form>
              <Typography
                sx={{
                  marginTop: '2vh',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Already has an account? <Link href="/Login"> Log in</Link>!
              </Typography>
            </Box>
            <Grid container>
              <Grid item xs />
              <Grid item />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Register;
