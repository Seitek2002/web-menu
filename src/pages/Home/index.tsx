import { FC } from 'react';

import SiteHeader from 'src/components/Home/SiteHeader';
import Header from 'src/components/Home/Header';
import Hero from 'src/components/Home/Hero';
import Points from 'src/components/Home/Points';
import Catalog from 'src/components/Home/Catalog';

import './style.scss';

const Home: FC = () => {
  return (
    <>
      <SiteHeader />
      <Header />
      <Hero />
      <Points />
      <Catalog />
    </>
  );
};

export default Home;
