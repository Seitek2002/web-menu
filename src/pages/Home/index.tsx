import { FC, useRef, useState } from "react";

import SiteHeader from "../../components/Mobile/Home/SiteHeader";
import Header from "../../components/Mobile/Home/Header";
import Hero from "../../components/Mobile/Home/Hero";
import Points from "../../components/Mobile/Home/Points";
import Catalog from "../../components/Mobile/Home/Catalog";

import SiteHeaderDesktop from "../../components/Desktop/Home/SiteHeader";
import HeroDesktop from "../../components/Desktop/Home/Hero";
import PointsDesktop from "../../components/Desktop/Home/Points";
import CatalogDesktop from "../../components/Desktop/Home/Catalog";

import "./style.scss";

const Home: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>("");

  // Создаем ref для контейнера с каталогом
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    // Прокручиваем внутреннее содержимое контейнера до начала
    if (catalogRef.current) {
      catalogRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <>
      {window.innerWidth <= 768 ? (
        <>
          <SiteHeader />
          <Header />
          <Hero />
          <Points 
            onCategoryChange={handleCategoryChange} 
            onSearchTextChange={handleSearchTextChange} 
          />
          <div ref={catalogRef} style={{ overflowY: 'auto', maxHeight: '600px' }}>
            <Catalog selectedCategory={selectedCategory} />
          </div>
        </>
      ) : (
        <div>
          <SiteHeaderDesktop setSearchText={setSearchText} />
          <HeroDesktop />
          <PointsDesktop onCategoryChange={handleCategoryChange} />
          <div ref={catalogRef} style={{ overflowY: 'auto', maxHeight: '600px' }}>
            <CatalogDesktop selectedCategory={selectedCategory} searchText={searchText} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
