import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IModificator } from 'types/products.types';
import { useAppSelector } from 'hooks/useAppSelector';
import Empty from './components/Empty';
import BusketDesktop from 'components/BusketDesktop';
import BusketCard from 'components/Cards/Cart';

import clearCartIcon from 'assets/icons/Busket/clear-cart.svg';
import cookie from 'assets/icons/Busket/cookie.svg';
import headerArrowIcon from 'assets/icons/Busket/header-arrow.svg';
import priceArrow from 'assets/icons/Busket/price-arrow.svg';
import all from 'assets/icons/Order/all.svg';
import ava from 'assets/icons/Order/ava.svg';

import './style.scss';

import { useMask } from '@react-input/mask';

const forgotList: {
  id: number;
  productName: string;
  productPrice: string;
  productDescription: string | null;
  productPhoto: string;
  weight: number;
  category: {
    id: number;
    categoryName: string;
  };
  modificators: IModificator[];
}[] = [
  {
    id: 14,
    productName: 'Borjomi 0.5l',
    productDescription: null,
    productPrice: '10.00',
    weight: 0,
    productPhoto:
      'https://joinposter.com/upload/pos_cdb_7631/menu/product_1464609975_1.jpg',
    category: {
      id: 9,
      categoryName: 'Cold drinks',
    },
    modificators: [],
  },
  {
    id: 16,
    productName: 'Capucino 250ml',
    productDescription: null,
    productPrice: '3.00',
    weight: 248,
    productPhoto:
      'https://joinposter.com/upload/pos_cdb_7631/menu/product_1464608672_3.jpg',
    category: {
      id: 7,
      categoryName: 'Coffee',
    },
    modificators: [],
  },
  {
    id: 17,
    productName: 'Croissant with chocolate',
    productDescription: null,
    productPrice: '4.00',
    weight: 190,
    productPhoto:
      'https://joinposter.com/upload/pos_cdb_7631/menu/product_1464251849_5.jpg',
    category: {
      id: 8,
      categoryName: 'Pastry',
    },
    modificators: [],
  },
  {
    id: 20,
    productName: 'Блины с творогом',
    productDescription: null,
    productPrice: '100.00',
    weight: 0,
    productPhoto:
      'https://joinposter.com/upload/pos_cdb_420172/menu/product_1739898117_11.jpeg',
    category: {
      id: 10,
      categoryName: 'Завтраки',
    },
    modificators: [],
  },
  {
    id: 21,
    productName: 'Каша рисовая',
    productDescription: null,
    productPrice: '150.00',
    weight: 0,
    productPhoto:
      'https://joinposter.com/upload/pos_cdb_420172/menu/product_1739897994_10.jpeg',
    category: {
      id: 10,
      categoryName: 'Завтраки',
    },
    modificators: [],
  },
  {
    id: 22,
    productName: 'Круассан баварский ',
    productDescription: null,
    productPrice: '200.00',
    weight: 0,
    productPhoto:
      'https://joinposter.com/upload/pos_cdb_420172/menu/product_1739898222_12.jpeg',
    category: {
      id: 10,
      categoryName: 'Завтраки',
    },
    modificators: [],
  },
];

const Cart = () => {
  const { t, i18n } = useTranslation();
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const colorTheme = useAppSelector(state => state.yourFeature.venue?.colorTheme);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [active, setActive] = useState(false);
  const [serverActive, setServerActive] = useState('');
  const navigate = useNavigate();

  const inputRef = useMask({
    mask: '+996 (___) ___-___',
    replacement: { _: /\d/ },
  });

  const list = useMemo(
    () => [t('busket.where.takeaway'), t('busket.where.dinein')],
    [i18n.language]
  );

  const VibrationClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
    VibrationClick();
  };

  const handleClickServer = (index: string) => {
    setServerActive(index);
    VibrationClick();
  };

  const solveTotalSum = () => {
    const cartSum =
      cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0) +
      150;
    if (serverActive.includes('%')) {
      const totalSum = cartSum * (+serverActive.replace(' %', '') / 100);
      return totalSum + cartSum;
    } else {
      const totalSum = cartSum + +serverActive.replace(' c', '');
      return totalSum;
    }
  };

  const checkDatas = () => {
    const orderProducts = cart.map((item) => {
      if (item.modificators.id) {
        return {
          product: +item.id.split(',')[0],
          count: +item.quantity,
          modificator: item.modificators.id,
        };
      } else {
        return {
          product: +item.id.split(',')[0],
          count: +item.quantity,
        };
      }
    });
    const acc = {
      phone: phoneNumber
        .replace('-', '')
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace(' ', ''),
      orderProducts,
      serviceMode: 0,
    };
    if (activeIndex) {
      acc.serviceMode = 1;
    } else {
      acc.serviceMode = 2;
    }
    console.log('приветик :3', acc);
  };

  return (
    <section className='cart'>
      <button onClick={checkDatas}>Проверка данных</button>
      <header className='cart__header'>
        <img src={headerArrowIcon} alt='' onClick={() => navigate(-1)} />
        <h3>Корзина</h3>
        <img src={clearCartIcon} alt='' />
      </header>
      {window.innerWidth < 768 && (
        <>
          <div className='cart__top'>Стол №12</div>
          <div className='cart__items'>
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <BusketCard key={item.id} item={item} />
                ))}
              </>
            ) : (
              <Empty />
            )}
          </div>
        </>
      )}
      <div className='md:flex gap-[24px]'>
        <div className='md:max-w-[50%]'>
          {cart.length > 0 ? (
            <>
              <div className='cart__order-type'>
                {list.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleClick(index);
                    }}
                    className={`cart__order-type-wrapper bg-[#fff] border-[#e1e2e5] ${
                      activeIndex === index ? `active` : ''
                    }`}
                    style={{
                      borderColor:
                        activeIndex === index ? colorTheme : '#e1e2e5',
                    }}
                  >
                    {activeIndex === index ? (
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g clipPath='url(#clip0_248_22508)'>
                          <path
                            d='M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z'
                            fill={colorTheme}
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_248_22508'>
                            <rect width='20' height='20' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    ) : (
                      <div className='cart__order-type-checkbox border-[#e1e2e5]'></div>
                    )}
                    {item}
                  </div>
                ))}
              </div>
              <div className='cart__contacts'>
                <div className='flex items-center justify-between mb-[12px]'>
                  <h4>Ваши контакты</h4>
                  <span className='required' style={{ color: colorTheme }}>
                    Обязательно*
                  </span>
                </div>
                <input
                  type='text'
                  placeholder='+996'
                  ref={inputRef}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Напишите время заказа или коментарий'
                />
              </div>
              <div className='cart__sum bg-[#fff]'>
                <div
                  onClick={() => setActive(!active)}
                  className='cart__sum-top text-[#80868B]'
                >
                  Детали суммы
                  <img
                    src={priceArrow}
                    alt='arrow'
                    className={
                      active ? 'cart__sum-img active' : 'cart__sum-img'
                    }
                  />
                </div>
                <div
                  className={
                    active
                      ? 'cart__sum-wrapper divide-y active'
                      : 'cart__sum-wrapper divide-y'
                  }
                  style={{
                    height:
                      active && serverActive ? '115px' : active ? '80px' : '0',
                  }}
                >
                  <div className='cart__sum-item text-[#80868B]'>
                    Общая стоимость
                    <div className='cart__sum-total all text-[#80868B]'>
                      {cart.reduce(
                        (acc, item) => acc + item.productPrice * item.quantity,
                        0
                      )}{' '}
                      с
                    </div>
                  </div>

                  {/* <div className='cart__sum-item text-[#80868B]'>
                    Бонусы
                    <div className='cart__sum-total bonus text-[#11af22]'>+99 б</div>
                  </div> */}
                  <div className='cart__sum-item text-[#80868B]'>
                    Обслуживание
                    <div className='cart__sum-total service'>150 с</div>
                  </div>
                  {serverActive && (
                    <div className='cart__sum-item text-[#80868B]'>
                      Чаевые
                      {/* <div className="cart__sum-total tips">{Math.round(calculateTips())} с</div> */}
                      <div className='cart__sum-total tips'>{serverActive}</div>
                    </div>
                  )}
                </div>
                <div className='cart__sum-ress border-[#f3f3f3]'>
                  Итоговая сумма <span>{solveTotalSum()} с</span>
                </div>
              </div>
              <div className='cart__server bg-[#fff]'>
                <h3 className='cart__server-title'>{t('busket.tips')}</h3>
                <div className='cart__server-info'>
                  <div className='cart__server-ava'>
                    <img src={ava} alt='' />
                  </div>
                  <div className='cart__server-inner'>
                    <span className='cart__server-job text-[#626576]'>
                      {t('busket.job')}
                    </span>
                    <span className='cart__server-name'>Имнакулов Дамир</span>
                  </div>
                </div>
                <div className='cart__server-wrapper'>
                  {['', '50 c', '100 c', '15 %', '20 %'].map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleClickServer(item)}
                      className={`cart__server-item ${
                        serverActive === item ? 'active' : 'bg-[#F9F9F9]'
                      }`}
                      style={
                        serverActive === item
                          ? { backgroundColor: colorTheme, color: '#fff' }
                          : {}
                      }
                    >
                      {item ? item : <img src={all} alt='' />}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className=''>
              <Empty />
            </div>
          )}
        </div>
        {window.innerWidth >= 768 && (
          <div className='busket flex-1'>
            <BusketDesktop to='/order' />
          </div>
        )}
      </div>
      <div className='cart__forgot'>
        <h4 className='cart__forgot-title'>
          Ничего не забыли?
          <img src={cookie} alt='cookie' />
        </h4>
        <div className='cart__forgot-wrapper'>
          {forgotList.slice(0, window.innerWidth < 768 ? 3 : 6).map((item) => (
            <div className='cart__forgot-cart bg-[#fff]'>
              <div className='cart__forgot-inner'>
                {/* <AddItem setDalete={deleteItem} setAdded={added} /> */}
              </div>
              <img
                src={item.productPhoto}
                className='cart__forgot-img'
                alt='img'
              />
              <div className='cart__forgot-info'>
                <span
                  className='cart__forgot-price'
                  style={{ color: colorTheme }}
                >
                  {item.productPrice} с
                </span>
                <span className='cart__forgot-weight text-[#ADADAD]'>
                  • {item.weight} г
                </span>
              </div>
              <p className='cart__forgot-name'>{item.productName}</p>
            </div>
          ))}
        </div>
      </div>
      {window.innerWidth < 768 && (
        <footer className='cart__footer'>
          <button
            disabled={!cart.length}
            style={{ backgroundColor: colorTheme }}
            onClick={() => navigate('/order')}
          >
            Далее
          </button>
        </footer>
      )}
    </section>
  );
};

export default Cart;
