import { FC, useEffect, useState } from "react";

import SiteHeader from "../../components/Mobile/Home/SiteHeader";
import Header from "../../components/Mobile/Home/Header";
import Hero from "../../components/Mobile/Home/Hero";
import Points from "../../components/Mobile/Home/Points";
import Catalog from "../../components/Mobile/Home/Catalog";

import SiteHeaderDesktop  from "../../components/desktop/Home/SiteHeader";
import HeaderDesktop from "../../components/desktop/Home/Header";
import HeroDesktop from "../../components/desktop/Home/Hero";
import PointsDesktop from "../../components/desktop/Home/Points";
import CatalogDesktop from "../../components/desktop/Home/Catalog";

import "./style.scss";

const Home: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      {isMobile ? (
        <>
          <SiteHeaderDesktop />
          <HeaderDesktop />
          <HeroDesktop />
          <PointsDesktop onCategoryChange={handleCategoryChange} />
          <CatalogDesktop selectedCategory={selectedCategory} />
        </>
      ) : (
        <div>
          <SiteHeaderDesktop/>
          <HeroDesktop />

        </div>
      )}
    </>
  );
};

export default Home;
