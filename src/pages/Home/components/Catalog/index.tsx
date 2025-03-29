import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductsQuery } from 'api/Products.api';
import { IProduct } from 'types/products.types';
import { useAppSelector } from 'hooks/useAppSelector';
import CatalogCard from 'components/Cards/Catalog';

import FoodDetail from './FoodDetail';

import nothing from 'assets/images/not-found-products.png';

import './style.scss';

interface IProps {
  searchText?: string;
  selectedCategory?: number;
}

const Catalog: FC<IProps> = ({ searchText, selectedCategory = 0 }) => {
  const { venue } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [activeFood, setActiveFood] = useState<IProduct | null>(null);
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const navigate = useNavigate();
  const colorTheme = 'red';
  const { data: items } = useGetProductsQuery({
    category: selectedCategory || undefined,
    search: searchText,
    venueSlug: venue,
  });

  const handleClose = () => {
    setIsShow(false);
    document.body.style.height = '';
    document.body.style.overflow = '';
  };

  const handleOpen = (food: IProduct) => {
    setIsShow(true);
    setActiveFood(food);
    document.body.style.height = '100dvh';
    document.body.style.overflow = 'hidden';
  };

  return (
    <section className='catalog'>
      <FoodDetail
        isShow={isShow}
        setIsShow={handleClose}
        item={
          activeFood || {
            category: { categoryName: '', id: 0 },
            productName: '',
            productPhoto: '',
            productPrice: 0,
            weight: 0,
            productDescription: '',
            modificators: [
              {
                id: 0,
                name: '',
                price: 0,
              },
            ],
            id: 0,
          }
        }
      />
      <h2>Все блюда</h2>
      {items && items.length > 0 ? (
        <div className='catalog__content'>
          {items?.map((item) => {
            return (
              <CatalogCard foodDetail={handleOpen} key={item.id} item={item} />
            );
          })}
          {window.innerWidth < 768 && cart.length !== 0 && (
            <div className='catalog__footer'>
              <button
                onClick={() => navigate('/cart')}
                style={{ backgroundColor: colorTheme }}
              >
                Далее
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='mt-[24px] flex flex-col items-center'>
          <h3 className='text-center text-[24px] font-semibold mb-[24px]'>
            Увы, ничего не найдено{'('}
          </h3>
          <img src={nothing} alt='' className='w-1/2' />
        </div>
      )}
    </section>
  );
};

export default Catalog;
