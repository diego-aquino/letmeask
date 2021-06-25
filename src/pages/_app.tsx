import { AppProps } from 'next/app';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import AuthContextProvider from '~/contexts/AuthContext';
import GlobalStyle from '~/styles/global';
import theme from '~/styles/theme';

import '~/services/firebase';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <AuthContextProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toaster />
      <Component {...pageProps} />
    </ThemeProvider>
  </AuthContextProvider>
);

export default App;
