import { FC, useEffect, useState } from 'react';

import Item from '../../components/Busket/Item';

import back from '../../assets/icons/Busket/back.svg';
import delet from '../../assets/icons/Busket/delete.svg';

import item1 from '../../assets/images/Catalog/item-1.webp';
import item2 from '../../assets/images/Catalog/item-2.webp';
import item3 from '../../assets/images/Catalog/item-3.webp';
import item4 from '../../assets/images/Catalog/item-4.webp';
import item5 from '../../assets/images/Catalog/item-5.webp';
import item6 from '../../assets/images/Catalog/item-6.webp';
import item7 from '../../assets/images/Catalog/item-7.webp';

import './style.scss';

const Busket: FC = () => {
  const [length, setLength] = useState(true);

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
      id: '0',
      name: 'Твистер Деклюкс острый',
      weight: 200,
      price: 240,
      img: item1,
      discount: 10,
      promotion: false,
    },
    {
      id: '1',
      name: 'Куриный шницель с картофельным пюре',
      weight: 300,
      price: 350,
      img: item2,
      discount: 0,
      promotion: true,
    },
    {
      id: '2',
      name: 'Греческий салат с оливками',
      weight: 250,
      price: 180,
      img: item3,
      discount: 0,
      promotion: true,
    },
    {
      id: '3',
      name: 'Паста с морепродуктами',
      weight: 350,
      price: 420,
      img: item4,
      discount: 15,
      promotion: false,
    },
    {
      id: '4',
      name: 'Бургер с беконом и сыром',
      weight: 250,
      price: 290,
      img: item5,
      discount: 7,
      promotion: false,
    },
    {
      id: '5',
      name: 'Ризотто с грибами',
      weight: 300,
      price: 330,
      img: item6,
      discount: 0,
      promotion: false,
    },
    {
      id: '6',
      name: 'Суп-пюре из брокколи с кремом',
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

  useEffect(() => {
    if (list.length >= 6) {
      setLength(false);
    } else {
      setLength(true);
    }
  }, []);

  return (
    <>
      <section className='c'>
        <div className='container'>
          <div className='c-content'>
            <div className='c-top'>
              <div className='c-wrapper-img'>
                <img src={back} alt='back' />
              </div>
              <h1 className='c-title'>Корзина</h1>
              <div className='c-wrapper-img'>
                <img src={delet} alt='delete' />
              </div>
            </div>

            <div className='c-table'>Стол №12</div>

            <div className='c-list divide-y'>
              {list.map((item) => (
                <Item key={item.id} {...item} length={length} />
              ))}
            </div>

            <div className='c-detail'>
              <div className='c-detail-top'>
                <h4 className='c-datail-name'></h4>
                <h4 className='c-datail-required'></h4>
              </div>
              <input type='number' className='c-datail-input' placeholder='' />
              <input type='text' className='c-datail-input' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Busket;
