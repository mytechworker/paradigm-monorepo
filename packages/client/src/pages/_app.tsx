import '@client/styles/globals.css';
import '@client/styles/style.css';
import '@client/styles/nightmode.css';

import type { AppProps } from 'next/app';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from'react-error-boundary';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

// node_modules css
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'nprogress/nprogress.css';

const AppContextProvider = dynamic(import('@client/context//AppContext'), { ssr: false });
const Landing = dynamic(import('@client/layout//Landing'), { ssr: false });


import store from '@client/redux//store';

import pageChangeEvent from '@client/utils//pageChangeEvent';
import type { NextPageLayout } from '@client/types/page.types';

type AppPropsWithLayout = AppProps & {
  Component: NextPageLayout;
};

export default function App({ Component, pageProps, router }: AppPropsWithLayout) {
  Router.events.on('routeChangeStart', pageChangeEvent().routeChangeStartHandler);
  Router.events.on('routeChangeComplete', pageChangeEvent().routeChangeCompleteHandler);
  Router.events.on('routeChangeError', pageChangeEvent().routeChangeErrorHandler);

  //   const isAdminRoute = router.pathname.startsWith('/admin');

  const getLayout = Component.getLayout ?? ((page) => <Landing>{page}</Landing>);

  return (
    <ErrorBoundary fallback={<>Something went wrong</>}>
      <CookiesProvider>
        <Provider store={store}>
          <AppContextProvider>{getLayout(<Component {...pageProps} {...router} />)}</AppContextProvider>
        </Provider>
      </CookiesProvider>
    </ErrorBoundary>
  );
}
