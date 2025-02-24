import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { clearCart } from 'src/store/yourFeatureSlice';

import CardBusket from 'src/components/Cards/Cart';
import SiteHeader from "../../components/Mobile/Home/SiteHeader";
import Header from "../../components/Mobile/Home/Header";
import Hero from "../../components/Mobile/Home/Hero";
import Points from "../../components/Mobile/Home/Points";
import Catalog from "../../components/Mobile/Home/Catalog";

import SiteHeaderDesktop from '../../components/Desktop/Home/SiteHeader';
import HeroDesktop from '../../components/Desktop/Home/Hero';
import PointsDesktop from '../../components/Desktop/Home/Points';
import CatalogDesktop from '../../components/Desktop/Home/Catalog';
import Footer from 'src/components/Mobile/Footer';

import delet from '../../assets/icons/Busket/delete.svg';

import './style.scss';

const Home: FC = () => {
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.yourFeature.items);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [searchText, setSearchText] = useState<string>('');

  const catalogRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    // Прокручиваем внутреннее содержимое контейнера до начала
    if (catalogRef.current) {
      catalogRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <div className='home'>
      {window.innerWidth <= 768 ? (
        <>
          <SiteHeader />
          <Header />
          <Hero />
          <Points
            onCategoryChange={handleCategoryChange}
            onSearchTextChange={handleSearchTextChange}
          />
          <div ref={catalogRef}>
            <Catalog selectedCategory={selectedCategory} />
          </div>
        </>
      ) : (
        <div>
          <SiteHeaderDesktop setSearchText={setSearchText} />
          <div className='flex justify-between gap-[20px]'>
            <div className='home__left w-[60%] max-h-dvh overflow-y-auto'>
              <HeroDesktop />
              <div ref={catalogRef}>
                <CatalogDesktop
                  selectedCategory={selectedCategory}
                  searchText={searchText}
                />
              </div>
            </div>
            <div className='home__right max-h-dvh overflow-y-auto'>
              <PointsDesktop onCategoryChange={handleCategoryChange} />
              <div className='desktop cart'>
                <div className='cart-right relative'>
                  <div className='cart-top'>
                    <h1 className='cart-title'>{t('busket.busketTitle')}</h1>
                    <div
                      className='cart-wrapper-img bg-[#FFF]'
                      onClick={() => {
                        dispatch(clearCart());
                      }}
                    >
                      <img src={delet} alt='delete' />
                    </div>
                  </div>
                  <div className='cart-bottom bg-[#FFF]'>
                    <div className='cart-table bg-[#F1F2F3]'>{t('table')}</div>
                    {cart.map((item) => (
                      <>
                        <CardBusket
                          key={item.id}
                          {...item}
                          cartLength={!!cart.length}
                        />
                      </>
                    ))}
                  </div>
                  <Footer position='absolute' />
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
