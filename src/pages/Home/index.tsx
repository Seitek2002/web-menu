import { FC, useEffect, useState } from "react";

import SiteHeader from "../../components/Mobile/Home/SiteHeader";
import Header from "../../components/Mobile/Home/Header";
import Hero from "../../components/Mobile/Home/Hero";
import Points from "../../components/Mobile/Home/Points";
import Catalog from "../../components/Mobile/Home/Catalog";

import SiteHeaderDesktop  from "../../components/Desktop/Home/SiteHeader";
import HeroDesktop from "../../components/Desktop/Home/Hero";
import PointsDesktop from "../../components/Desktop/Home/Points";
import CatalogDesktop from "../../components/Desktop/Home/Catalog";

import "./style.scss";

const Home: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [searchText, setSearchText] = useState<string>("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <>
      {isMobile ? (
        <>
          <SiteHeader />
          <Header />
          <Hero />
          <Points onCategoryChange={handleCategoryChange} onSearchTextChange={handleSearchTextChange} />
          <Catalog selectedCategory={selectedCategory} />
        </>
      ) : (
        <div>
          <SiteHeaderDesktop setSearchText={setSearchText} />
          <HeroDesktop />
          <PointsDesktop onCategoryChange={handleCategoryChange} />
          <CatalogDesktop selectedCategory={selectedCategory} searchText={searchText} />
        </div>
      )}
    </>
  );
};

export default Home;
