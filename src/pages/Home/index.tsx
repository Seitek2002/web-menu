import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/hooks/useAppSelector";
import { clearCart } from "src/store/yourFeatureSlice";

import CardBusket from "src/components/Cards/Cart";
import SiteHeader from "src/components/Mobile/Home/SiteHeader";
import Header from "src/components/Mobile/Home/Header";
import Hero from "src/components/Mobile/Home/Hero";
import Points from "src/components/Mobile/Home/Points";
import Catalog from "src/components/Mobile/Home/Catalog";

import SiteHeaderDesktop from "src/components/Desktop/Home/SiteHeader";
import HeroDesktop from "src/components/Desktop/Home/Hero";
import PointsDesktop from "src/components/Desktop/Home/Points";
import CatalogDesktop from "src/components/Desktop/Home/Catalog";
import Footer from "src/components/Mobile/Footer";

import delet from "src/assets/icons/Busket/delete.svg";

import "./style.scss";

const Home: FC = () => {
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.yourFeature.items);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [searchText, setSearchText] = useState("");
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (categoryId?: number) => {
    setSelectedCategory(categoryId);
    catalogRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="home">
      {isMobile ? (
        <>
          <SiteHeader />
          <Header />
          <Hero />
          <Points
            onCategoryChange={handleCategoryChange}
            onSearchTextChange={setSearchText}
          />
          <div ref={catalogRef}>
            <Catalog selectedCategory={selectedCategory} />
          </div>
        </>
      ) : (
        <div>
          <SiteHeaderDesktop setSearchText={setSearchText} />
          <div className="flex justify-between gap-[20px]">
            <div className="home__left w-[60%] max-h-dvh overflow-y-auto">
              <HeroDesktop />
              <div ref={catalogRef}>
                <CatalogDesktop
                  selectedCategory={selectedCategory}
                  searchText={searchText}
                />
              </div>
            </div>
            <div className="home__right max-h-dvh overflow-y-auto">
              <PointsDesktop onCategoryChange={handleCategoryChange} />
              <div className="desktop cart">
                <div className="cart-right relative">
                  <div className="cart-top flex justify-between items-center">
                    <h1 className="cart-title">{t("busket.busketTitle")}</h1>
                    <div
                      className="cart-wrapper-img bg-[#FFF]"
                      onClick={() => dispatch(clearCart())}
                    >
                      <img src={delet} alt="delete" />
                    </div>
                  </div>
                  <div className="cart-bottom bg-[#FFF]">
                    <div className="cart-table bg-[#F1F2F3]">{t("table")}</div>
                    {cart.map((item) => (
                      <CardBusket
                        key={item.id}
                        {...item}
                        cartLength={!!cart.length}
                      />
                    ))}
                  </div>
                  <Footer position="absolute" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
