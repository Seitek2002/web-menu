import { FC } from 'react';

import Header from 'src/components/Header';
import Hero from 'src/components/Hero';
import Points from 'src/components/Points';
import Catalog from 'src/components/Catalog';

import './style.scss';

const Home: FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <Points />
      <Catalog />
    </>
  );
};

export default Home;
