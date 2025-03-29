import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductsQuery } from 'api/Products.api';
import { IProduct } from 'types/products.types';
import CatalogCard from 'components/Cards/Catalog';

import FoodDetail from '../Catalog/FoodDetail';
import Item from '../Categories/Item';

import all from 'assets/icons/Categories/all.svg';
import nothing from 'assets/images/not-found-products.png';

import './style.scss';

const categories = [
  {
    id: 0,
    categoryName: 'Все',
    categoryPhoto: all,
  },
  {
    id: 13,
    categoryName: 'Чай',
    categoryPhoto:
      'https://imenu.kg/media/menu/category/2025/03/2c37fb5960249296946d146045c5827f_3.jpg',
  },
  {
    id: 11,
    categoryName: 'Кофе',
    categoryPhoto:
      'https://imenu.kg/media/menu/category/2025/03/7b1e70307c83681416d95abd2492384260e5efb9.webp',
  },
  {
    id: 12,
    categoryName: 'Холодный кофе',
    categoryPhoto:
      'https://imenu.kg/media/menu/category/2025/03/Iced_Caffe_Latte_.jpeg.webp',
  },
];

interface IProps {
  onSearchChange: (bool: boolean) => void;
  searchText?: string;
  setSearchText: (text: string) => void;
}

const Search: FC<IProps> = ({ onSearchChange, searchText, setSearchText }) => {
  const { venue } = useParams();
  const [active, setActive] = useState<number | undefined>(0);
  const [isShow, setIsShow] = useState(false);
  const [activeFood, setActiveFood] = useState<IProduct | null>(null);
  const { data: items } = useGetProductsQuery({
    category: undefined,
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

  const selectCategory = (id: number | undefined) => {
    setActive(id);
    // onCategoryChange(id ?? undefined);

    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className='search'>
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
      <div className='search__content'>
        <div className='search__top'>
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => onSearchChange(false)}
          >
            <g clip-path='url(#clip0_381_56772)'>
              <path
                d='M15 4.5L7.5 12L15 19.5'
                stroke='#090A0B'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </g>
            <defs>
              <clipPath id='clip0_381_56772'>
                <rect
                  width='24'
                  height='24'
                  fill='white'
                  transform='matrix(0 -1 -1 0 24 24)'
                />
              </clipPath>
            </defs>
          </svg>

          <label htmlFor='mobile-search'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_381_56783)'>
                <path
                  d='M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z'
                  stroke='#090A0B'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M15.8035 15.8035L21 21'
                  stroke='#090A0B'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </g>
              <defs>
                <clipPath id='clip0_381_56783'>
                  <rect width='24' height='24' fill='white' />
                </clipPath>
              </defs>
            </svg>
            <input
              type='text'
              placeholder='Поиск'
              id='mobile-search'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
        </div>

        {!searchText && (
          <div className='search__categories'>
            <h3>Категории</h3>
            <div className='search__categories-items categories'>
              {categories.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  active={active}
                  selectCategory={selectCategory}
                />
              ))}
            </div>
          </div>
        )}

        {searchText &&
          (items && items.length > 0 ? (
            <div className='search__catalog'>
              {items.map((item) => (
                <CatalogCard
                  foodDetail={handleOpen}
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className='mt-[24px]'>
              <h3 className='text-center text-[24px] font-semibold mb-[24px]'>
                Увы, ничего не найдено{'('}
              </h3>
              <img src={nothing} alt='' className='w-full' />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
