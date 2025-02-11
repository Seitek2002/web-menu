import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setButtonText } from '../../store/yourFeatureSlice';

import Item from '../../components/Busket/Item';
import Head from '../../components/Busket/Head';
import ForgotCart from 'src/components/Busket/ForgotCart';
import Detail from '../../components/Busket/Detail';
import Where from '../../components/Busket/Where';
import Price from '../../components/Busket/Price';
import Promo from '../../components/Busket/Promo';
import Tips from '../../components/Busket/Tips';
import Modal from '../../components/Busket/Modal';

import cookie from '../../assets/icons/Busket/cookie.svg';

import item1 from '../../assets/images/Catalog/item-1.webp';
import item2 from '../../assets/images/Catalog/item-2.webp';
import item3 from '../../assets/images/Catalog/item-3.webp';

import './style.scss';

const Busket: FC = () => {
  const dispatch = useDispatch();
  const [length, setLength] = useState(true);
  const cart = useAppSelector((state) => state.yourFeature.items);
  const [title, setTitle] = useState('Очистить корзину?');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(setButtonText('Далее'));
    if (cart.length <= 2) {
      setLength(true);
    } else {
      setLength(false);
    }
    return () => {
      dispatch(setButtonText('Заказать'));
    };
  }, [cart.length]);

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
  ];

  const renameTitleHead = () => {
    setModal(true);
    setTitle('Очистить корзину?');
  };
  const renameTitlePlaces = () => {
    setModal(true);
    setTitle('Мест не осталось');
  };

  return (
    <>
      <section className='busket text-[#090A0B]'>
        <div className='container'>
          <div className='busket-content'>
            <Head renameTitleHead={renameTitleHead} />
            <div className='busket-list divide-y bg-[#fff]'>
              {cart.map((item) => (
                <Item key={item.id} {...item} cartLength={length} />
              ))}
            </div>
            <Detail />
            <Where />
            <Price />
            <Promo renameTitlePlaces={renameTitlePlaces} />

            <div className='busket-forgot'>
              <h4 className='busket-forgot-title'>
                Ничего не забыли?
                <img src={cookie} alt='cookie' />
              </h4>
              <div className='busket-forgot-wrapper'>
                {list.map((item) => (
                  <ForgotCart key={item.id} {...item} />
                ))}
              </div>
            </div>
            <Tips />
          </div>
        </div>

        {modal && (
          <Modal title={title} onClose={() => setModal(false)}>
            {title === 'Очистить корзину?' ? (
              <div className='busket-modal-btns'>
                <button
                  onClick={() => setModal(false)}
                  className='busket-modal-gray bg-[#F1F2F3] text-[#000]'
                >
                  Да
                </button>
                <button
                  onClick={() => setModal(false)}
                  className='busket-modal-purple bg-[#875AFF] text-[#fff]'
                >
                  Отменить
                </button>
              </div>
            ) : (
              <>
                <p className='busket-modal-text text-[#727272]'>
                  Вы можете оформить заказ с собой
                </p>
                <button
                  onClick={() => setModal(false)}
                  className='busket-modal-btn text-[#090A0B] bg-[#F1F2F3]'
                >
                  Взять с собой
                </button>
              </>
            )}
          </Modal>
        )}
      </section>
    </>
  );
};

export default Busket;
