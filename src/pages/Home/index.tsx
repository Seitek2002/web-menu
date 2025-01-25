import { FC, useState } from 'react';

import SiteHeader from 'src/components/Home/SiteHeader';
import Header from 'src/components/Home/Header';
import Hero from 'src/components/Home/Hero';
import Points from 'src/components/Home/Points';
import Catalog from 'src/components/Home/Catalog';

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
