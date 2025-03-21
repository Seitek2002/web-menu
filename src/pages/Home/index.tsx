import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { clearCart, setVenue } from 'src/store/yourFeatureSlice';
import { useGetVenueQuery } from 'src/api/Venue.api';
import { useParams } from 'react-router-dom';
import CardBusket from 'src/components/Cards/Cart';
import SiteHeader from 'src/pages/Home/components/Mobile/SiteHeader';
import Header from 'src/pages/Home/components/Mobile/Header';
import Hero from 'src/pages/Home/components/Mobile/Hero';
import Points from 'src/pages/Home/components/Mobile/Points';
import Catalog from 'src/pages/Home/components/Mobile/Catalog';

import SiteHeaderDesktop from 'src/pages/Home/components/Desktop/SiteHeader';
import HeroDesktop from 'src/pages/Home/components/Desktop/Hero';
import PointsDesktop from 'src/pages/Home/components/Desktop/Points';
import CatalogDesktop from 'src/pages/Home/components/Desktop/Catalog';
import Footer from 'src/components/Mobile/Footer';

import delet from '../../assets/icons/Busket/delete.svg';
import Modal from '../Busket/components/Modal';

import './style.scss';

const Home: FC = () => {
  const { venue, table, bo } = useParams();
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const { data: venueData } = useGetVenueQuery({
    venueSlug: venue ?? '',
  });

  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.yourFeature.items);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalTitle = t('busket.modal.clear');
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (categoryId?: number) => {
    setSelectedCategory(categoryId);
    catalogRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(setVenue(venueData));
  }, [dispatch, venueData]);

  useEffect(() => {
    if (table) {
      localStorage.setItem('currentUrl', `${venue}/${bo}/${table}`);
    } else {
      localStorage.setItem('currentUrl', `${venue}/${bo}`);
    }
  }, []);

  return (
    <div className='home'>
      {window.innerWidth <= 768 ? (
        <>
          <SiteHeader />
          <Header venueData={venueData} />
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
          <SiteHeaderDesktop
            setSearchText={setSearchText}
            venueData={venueData}
          />
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
                  <div className='cart-top flex justify-between items-center'>
                    <h1 className='cart-title'>{t('busket.busketTitle')}</h1>
                    <div
                      className='cart-wrapper-img bg-[#FFF]'
                      onClick={() => setIsModalOpen(true)}
                    >
                      <img src={delet} alt='delete' />
                    </div>
                  </div>
                  <div className='cart-bottom bg-[#FFF]'>
                    <div className='cart-table bg-[#F1F2F3]'>
                      {/* {t("table")} */}
                      {table ? `Стол №${table}` : 'На вынос'}
                    </div>
                    {cart.map((item) => (
                      <CardBusket
                        key={item.id}
                        {...item}
                        cartLength={!!cart.length}
                      />
                    ))}
                  </div>
                  <Footer position='absolute' />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal title={modalTitle} onClose={() => setIsModalOpen(false)}>
          {modalTitle === t('busket.modal.clear') ? (
            <div className='busket__modal-btns'>
              <button
                onClick={handleClearCart}
                className='busket__modal-gray bg-[#F1F2F3] text-[#000]'
              >
                {t('busket.modal.yes')}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ backgroundColor: colorTheme }}
                className={`busket__modal-purple text-[#fff]`}
              >
                {t('busket.modal.no')}
              </button>
            </div>
          ) : (
            <>
              <p className='busket__modal-text text-[#727272]'>
                {t('busket.modal.arrange')}
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className='busket__modal-btn text-[#090A0B] bg-[#F1F2F3]'
              >
                {t('busket.modal.myself')}
              </button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Home;
