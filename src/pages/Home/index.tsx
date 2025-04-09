import { useEffect, useRef, useState } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import Catalog from './components/Catalog';
import Categories from './components/Categories';
import Search from './components/Search';
import BusketDesktop from 'components/BusketDesktop';
import Header from 'components/Header';
import Hero from 'components/Hero';
import SupHeader from 'components/SubHeader';

import clearCartIcon from 'assets/icons/Busket/clear-cart.svg';

import { clearCart } from 'src/store/yourFeatureSlice';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const catalogRef = useRef<HTMLDivElement>(null);
  const venue = useAppSelector((state) => state.yourFeature.venue);

  const dispatch = useAppDispatch();
  const [search, onSearch] = useState(false);

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const onSearchChange = (bool: boolean) => {
    onSearch(bool);
    document.body.style.overflow = bool ? 'hidden' : '';
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (categoryId?: number) => {
    setSelectedCategory(categoryId);
    catalogRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = venue.companyName;
  }, [venue.companyName])

  return (
    <>
      <div className='bg-white rounded-[12px] p-[12px]'>
        <Header searchText={searchText} setSearchText={setSearchText} />
        <hr className='my-[10px]' />
        <SupHeader />
      </div>
      {window.innerWidth < 768 ? (
        <>
          {search && (
            <Search
              onSearchChange={onSearchChange}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
          <Hero />
          <Categories
            onCategoryChange={handleCategoryChange}
            onSearchChange={onSearchChange}
          />
          <div ref={catalogRef} className='pb-[100px]'>
            <Catalog selectedCategory={selectedCategory} />
          </div>
        </>
      ) : (
        <div className='flex gap-[30px] items-start pb-[50px]'>
          <div className='max-w-[60%]'>
            <Hero />
            <Catalog searchText={searchText} selectedCategory={selectedCategory} />
          </div>
          <div className='max-w-[40%] sticky top-0'>
            <Categories
              onCategoryChange={handleCategoryChange}
              onSearchChange={onSearchChange}
            />
            <div className='busket'>
              <header className='busket__header'>
                <h2>Корзина</h2>
                <img
                  onClick={clearCartHandler}
                  src={clearCartIcon}
                  alt=''
                  className='cursor-pointer'
                />
              </header>
              <BusketDesktop to='/cart' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
