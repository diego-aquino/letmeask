import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class Document extends NextDocument {
  static async getInitialProps(
    context: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await NextDocument.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap"
          />

          <meta name="application-name" content="Letmeask" />
          <meta
            name="description"
            content="Answer your audience's questions in real time"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#fefefe" />

          <link rel="shortcut icon" type="image/png" href="/favicon.png" />

          <link rel="manifest" href="/manifest.json" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://meask.vercel.app" />
          <meta name="twitter:title" content="Letmeask" />
          <meta
            name="twitter:description"
            content="Answer your audience's questions in real time"
          />
          <meta
            name="twitter:image"
            content="https://meask.vercel.com/icon-512x512.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Letmeask" />
          <meta
            property="og:description"
            content="Answer your audience's questions in real time"
          />
          <meta property="og:site_name" content="Letmeask" />
          <meta property="og:url" content="https://meask.vercel.app" />
          <meta
            property="og:image"
            content="https://meask.vercel.app/icon-512x512.png"
          />

          <link rel="apple-touch-icon" href="/icon-512x512.png" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="384x384"
            href="/icon-384x384.png"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Letmeask" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
