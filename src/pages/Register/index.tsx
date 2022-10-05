import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline, Grid, Link, Paper, TextField, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import { ImBug } from 'react-icons/im';

function Register(): React.ReactElement {
  const theme = createTheme({
    palette: {
      primary: { main: '#990011', light: '#FCF6F5FF', dark: '#730000' },
    },
  });

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
              Sign up
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoFocus />
              <TextField margin="normal" required fullWidth name="name" label="Name" type="name" id="name" />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Username"
                type="username"
                id="password"
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
              />
              <Button variant="contained" fullWidth href="Actions">
                Sign up
              </Button>
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
