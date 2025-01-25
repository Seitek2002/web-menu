import { FC, useState } from 'react';
import MenuSkeleton from '../../../skeletons/Menu';
import Item from './Item';
import FoodDetail from '../FoodDetail';
import { IFoodCatalog } from 'src/types/food.types';

import item1 from '../../../assets/images/Catalog/item-1.webp';
import item2 from '../../../assets/images/Catalog/item-2.webp';
import item3 from '../../../assets/images/Catalog/item-3.webp';
import item4 from '../../../assets/images/Catalog/item-4.webp';
import item5 from '../../../assets/images/Catalog/item-5.webp';
import item6 from '../../../assets/images/Catalog/item-6.webp';
import item7 from '../../../assets/images/Catalog/item-7.webp';

import './style.scss';

const Catalog: FC = () => {
  const [isShow, setIsShow] = useState(false);
  const list: IFoodCatalog[] = [
    {
      id: 0,
      productName: 'Твистер Делюкс острый',
      productPrice: '240',
      productPhoto: item1,
      weight: 200,
      category: {
        id: 1,
        categoryName: 'Сэндвичи',
      },
    },
    {
      id: 1,
      productName: 'Куриный шницель с картофельным пюре',
      productPrice: '350',
      weight: 300,
      productPhoto: item2,
      category: {
        id: 2,
        categoryName: 'Основные блюда',
      },
    },
    {
      id: 2,
      productName: 'Греческий салат с оливками',
      productPrice: '180',
      productPhoto: item3,
      weight: 200,
      category: {
        id: 3,
        categoryName: 'Салаты',
      },
    },
    {
      id: 3,
      productName: 'Паста с морепродуктами',
      productPrice: '420',
      weight: 300,
      productPhoto: item4,
      category: {
        id: 2,
        categoryName: 'Основные блюда',
      },
    },
    {
      id: 4,
      productName: 'Бургер с беконом и сыром',
      productPrice: '290',
      productPhoto: item5,
      weight: 200,
      category: {
        id: 1,
        categoryName: 'Сэндвичи',
      },
    },
    {
      id: 5,
      productName: 'Ризотто с грибами',
      productPrice: '330',
      productPhoto: item6,
      weight: 300,
      category: {
        id: 2,
        categoryName: 'Основные блюда',
      },
    },
    {
      id: 6,
      productName: 'Суп-пюре из брокколи с кремом',
      productPrice: '220',
      weight: 200,
      productPhoto: item7,
      category: {
        id: 4,
        categoryName: 'Супы',
      },
    },
    {
      id: 7,
      productName: 'Стейк с картофелем фри',
      productPrice: '550',
      productPhoto: item1,
      weight: 200,
      category: {
        id: 2,
        categoryName: 'Основные блюда',
      },
    },
    {
      id: 8,
      productName: 'Лосось, запеченный с лимоном',
      productPrice: '480',
      productPhoto: item3,
      weight: 200,
      category: {
        id: 2,
        categoryName: 'Основные блюда',
      },
    },
    {
      id: 9,
      productName: 'Цезарь с курицей',
      productPrice: '370',
      productPhoto: item2,
      weight: 200,
      category: {
        id: 3,
        categoryName: 'Салаты',
      },
    },
  ];

  const handleClick = (value: boolean) => {
    document.body.style.overflow = value ? 'hidden' : 'auto';
    setIsShow(value);
  };

  return (
    <section className='cart'>
      <div className='container'>
        <h2 className='cart-title'>Все блюда</h2>
        <div className='cart-wrapper'>
          {!list.length
            ? Array(6)
                .fill(5)
                .map(() => <MenuSkeleton />)
            : list.map((item) => (
                <Item key={item.id} {...item} setIsShow={() => handleClick(true)} />
              ))}
        </div>
      </div>
      {isShow && <FoodDetail setIsShow={() => handleClick(false)} />}
    </section>
  );
};

export default Catalog;
