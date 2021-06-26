import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import AuthContextProvider from '~/contexts/AuthContext';
import GlobalStyle from '~/styles/global';
import theme from '~/styles/theme';

import '~/services/firebase';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
    </Head>

    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Toaster />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  </>
);

export default App;
