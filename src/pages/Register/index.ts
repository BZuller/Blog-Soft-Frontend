import React, { useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Register(): React.ReactElement {
  const theme = createTheme({
    palette: {
      primary: { main: '#990011', light: '#FCF6F5FF', dark: '#730000' },
    },
  });
}
