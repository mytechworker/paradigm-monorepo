import Head from 'next/head';

import Search from '@client/components/search/Search';
import MainSlider from '@client/components/slider/banner';

import type { NextPageLayout } from '@client/types/page.types';

const Home: NextPageLayout = () => {
  return (
    <>
      <Head>
        <title>Paradigm Fund</title>
        <meta name="description" content="Paradigm Fund Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainSlider />
        <Search />

        <h1>
          Welcome to Paradigm Fund!
          <br />
          Discover the future of technology and innovation.
        </h1>
      </main>
    </>
  );
};

export default Home;
