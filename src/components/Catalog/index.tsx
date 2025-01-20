import { FC } from 'react';
import MenuSkeleton from '../../skeletons/Menu';
import Item from './Item';

import item1 from "../../assets/images/Catalog/item-1.webp";
import item2 from "../../assets/images/Catalog/item-2.webp";
import item3 from "../../assets/images/Catalog/item-3.webp";
import item4 from "../../assets/images/Catalog/item-4.webp";
import item5 from "../../assets/images/Catalog/item-5.webp";
import item6 from "../../assets/images/Catalog/item-6.webp";
import item7 from "../../assets/images/Catalog/item-7.webp";

import './style.scss';

const Catalog: FC = () => {
  const list: {
    id: string;
    name: string;
    weight: number;
    price: number;
    img: string;
    discount: number;
    promotion: boolean;
  }[] = [
    {
      id: "0",
      name: "Твистер Деклюкс острый",
      weight: 200,
      price: 240,
      img: item1, 
      discount: 10,
      promotion: false,
    },
    {
      id: "1",
      name: "Куриный шницель с картофельным пюре",
      weight: 300,
      price: 350,
      img: item2, 
      discount: 0,
      promotion: true,
    },
    {
      id: "2",
      name: "Греческий салат с оливками",
      weight: 250,
      price: 180,
      img: item3, 
      discount: 0,
      promotion: true,
    },
    {
      id: "3",
      name: "Паста с морепродуктами",
      weight: 350,
      price: 420,
      img: item4, 
      discount: 15,
      promotion: false,
    },
    {
      id: "4",
      name: "Бургер с беконом и сыром",
      weight: 250,
      price: 290,
      img: item5, 
      discount: 7,
      promotion: false,
    },
    {
      id: "5",
      name: "Ризотто с грибами",
      weight: 300,
      price: 330,
      img: item6, 
      discount: 0,
      promotion: false,
    },
    {
      id: "6",
      name: "Суп-пюре из брокколи с кремом",
      weight: 250,
      price: 220,
      img: item7, 
      discount: 10,
      promotion: false,
    },
    {
      id: '7',
      name: 'Стейк с картофелем фри',
      weight: 400,
      price: 550,
      img: item1,
      discount: 20,
      promotion: false,
    },
    {
      id: '8',
      name: 'Лосось, запеченный с лимоном',
      weight: 280,
      price: 480,
      img: item3,
      discount: 0,
      promotion: false,
    },
    {
      id: '9',
      name: 'Цезарь с курицей',
      weight: 350,
      price: 370,
      img: item2,
      discount: 0,
      promotion: false,
    },
  ];

  return (
    <section className='cart'>
      <div className='container'>
        <h2 className='cart-title'>Все блюда</h2>
        <div className='cart-wrapper'>
          {
            !list.length ? (
              Array(6).fill(5).map(_ => (
                <MenuSkeleton />
              ))
            ) : (
              list.map((item) => (
                <Item key={item.id} {...item} />
              ))
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Catalog;
