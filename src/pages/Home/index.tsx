import { FC, useState } from 'react';

import SiteHeader from '../../components/Mobile/Home/SiteHeader';
import Header from '../../components/Mobile/Home/Header';
import Hero from '../../components/Mobile/Home/Hero';
import Points from '../../components/Mobile/Home/Points';
import Catalog from '../../components/Mobile/Home/Catalog';

import './style.scss';

const Home: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <SiteHeader />
      <Header />
      <Hero />
      <Points onCategoryChange={handleCategoryChange} />
      <Catalog selectedCategory={selectedCategory} />
    </>
  );
};

export default Home;
