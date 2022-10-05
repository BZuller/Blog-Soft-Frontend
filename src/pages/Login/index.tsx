/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ImBug } from 'react-icons/im';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HttpClient from '../../services/httpClient';
import { AuthContext } from '../../contexts/AuthContext';

function Login(): React.ReactElement {
  const theme = createTheme({
    palette: {
      primary: { main: '#990011', light: '#FCF6F5FF', dark: '#730000' },
    },
  });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useHistory();
  const auth = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (expect: React.FormEvent<HTMLFormElement>) => {
    expect.preventDefault();
    const token = await auth.signIn(email, password);
    if (token) {
      HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
      navigate.push('/');
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
          backgroundColor: '#401b1b',
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Button variant="outlined" fullWidth href="/Register">
                Sign up
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Login;
