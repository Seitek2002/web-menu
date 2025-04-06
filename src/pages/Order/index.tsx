import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/useAppSelector';
import Item from './components/Item';
import shawarma from 'assets/images/Catalog/item-1.webp';
import burger from 'assets/images/Catalog/item-2.webp';

import headerArrowIcon from 'assets/icons/Busket/header-arrow.svg';
import guy from 'assets/icons/Order/guy.svg';
import share from 'assets/icons/Order/share.svg';
import cake from 'assets/images/OrderStatus/cake.png';
import pancakes from 'assets/images/OrderStatus/pancakes.png';
import salad from 'assets/images/OrderStatus/salad.png';

import './style.scss';

interface Order {
  id: number;
  img: string;
  name: string;
  price: number;
  weight: number;
  quantity: number;
}

const myOrders: Order[] = [
  {
    id: 0,
    img: salad,
    name: 'Салат с креветками',
    price: 200,
    weight: 200,
    quantity: 2,
  },
  {
    id: 1,
    img: shawarma,
    name: 'Двойная запеченная шаурма',
    price: 400,
    weight: 500,
    quantity: 2,
  },
];

const allOrders: Order[] = [
  {
    id: 2,
    img: burger,
    name: 'Бургер стандартный',
    price: 600,
    weight: 300,
    quantity: 2,
  },
  {
    id: 3,
    img: cake,
    name: 'Шоколадный торт',
    price: 480,
    weight: 120,
    quantity: 2,
  },
  {
    id: 4,
    img: pancakes,
    name: 'Японские панкейки с ягодами и медовым сиропом',
    price: 230,
    weight: 350,
    quantity: 1,
  },
  ...myOrders, // Это объединяет myOrders в allOrders
];

const Order = () => {
  const navigate = useNavigate();
  const venueData = useAppSelector((state) => state.yourFeature.venue);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  return (
    <div className='order'>
      <header className='order__header'>
        <img src={headerArrowIcon} alt='' onClick={() => navigate(-1)} />
        <h3>Мой заказ</h3>
        <div></div>
      </header>
      <div className='md:flex flex-row-reverse items-start gap-[24px]'>
        <div className='order__content'>
          <div className='order__top'>
            <div className='size-[30px]'></div>
            <div className='order__table'>
              <svg
                width='21'
                height='20'
                viewBox='0 0 21 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_381_59651)'>
                  <path
                    d='M15.5 2.5H5.5C5.15482 2.5 4.875 2.77982 4.875 3.125V6.875C4.875 7.22018 5.15482 7.5 5.5 7.5H15.5C15.8452 7.5 16.125 7.22018 16.125 6.875V3.125C16.125 2.77982 15.8452 2.5 15.5 2.5Z'
                    stroke={colorTheme}
                    stroke-width='1.7'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M16.75 11.25H4.25C3.90482 11.25 3.625 11.5298 3.625 11.875V13.125C3.625 13.4702 3.90482 13.75 4.25 13.75H16.75C17.0952 13.75 17.375 13.4702 17.375 13.125V11.875C17.375 11.5298 17.0952 11.25 16.75 11.25Z'
                    stroke={colorTheme}
                    stroke-width='1.7'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M7.375 7.5V11.25'
                    stroke={colorTheme}
                    stroke-width='1.7'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M13.625 7.5V11.25'
                    stroke={colorTheme}
                    stroke-width='1.7'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M15.5 13.75V17.5'
                    stroke={colorTheme}
                    stroke-width='1.7'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M5.5 13.75V17.5'
                    stroke={colorTheme}
                    stroke-width='1.7'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_381_59651'>
                    <rect
                      width='20'
                      height='20'
                      fill='white'
                      transform='translate(0.5)'
                    />
                  </clipPath>
                </defs>
              </svg>
              {
                venueData?.table?.tableNum && (
                  <span style={{ color: colorTheme }}>Стол №12</span>
                )
              }
            </div>
            <img src={share} alt='' className='share' />
          </div>
          <div className='order__status-img'>
            <img src={guy} alt='' />
          </div>
          <h3>
            <svg
              width='21'
              height='21'
              viewBox='0 0 21 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_381_59798)'>
                <path
                  d='M10.5 2.53809C8.89303 2.53809 7.32214 3.01461 5.986 3.9074C4.64985 4.80018 3.60844 6.06913 2.99348 7.55378C2.37852 9.03843 2.21762 10.6721 2.53112 12.2482C2.84463 13.8243 3.61846 15.272 4.75476 16.4083C5.89106 17.5446 7.3388 18.3185 8.9149 18.632C10.491 18.9455 12.1247 18.7846 13.6093 18.1696C15.094 17.5546 16.3629 16.5132 17.2557 15.1771C18.1485 13.8409 18.625 12.2701 18.625 10.6631C18.6227 8.5089 17.766 6.4436 16.2427 4.92036C14.7195 3.39712 12.6542 2.54036 10.5 2.53809ZM14.0672 9.23027L9.69219 13.6053C9.63415 13.6634 9.56522 13.7095 9.48934 13.7409C9.41347 13.7724 9.33214 13.7886 9.25 13.7886C9.16787 13.7886 9.08654 13.7724 9.01067 13.7409C8.93479 13.7095 8.86586 13.6634 8.80782 13.6053L6.93282 11.7303C6.81554 11.613 6.74966 11.4539 6.74966 11.2881C6.74966 11.1222 6.81554 10.9632 6.93282 10.8459C7.05009 10.7286 7.20915 10.6627 7.375 10.6627C7.54086 10.6627 7.69992 10.7286 7.81719 10.8459L9.25 12.2795L13.1828 8.3459C13.2409 8.28783 13.3098 8.24177 13.3857 8.21034C13.4616 8.17891 13.5429 8.16274 13.625 8.16274C13.7071 8.16274 13.7884 8.17891 13.8643 8.21034C13.9402 8.24177 14.0091 8.28783 14.0672 8.3459C14.1253 8.40397 14.1713 8.47291 14.2027 8.54878C14.2342 8.62465 14.2504 8.70596 14.2504 8.78809C14.2504 8.87021 14.2342 8.95153 14.2027 9.0274C14.1713 9.10327 14.1253 9.1722 14.0672 9.23027Z'
                  fill='#06C740'
                />
              </g>
              <defs>
                <clipPath id='clip0_381_59798'>
                  <rect
                    width='20'
                    height='20'
                    fill='white'
                    transform='translate(0.5 0.663086)'
                  />
                </clipPath>
              </defs>
            </svg>
            Спасибо,заказ принят!
          </h3>
          <span>Ожидайте в течении 15-20 минут</span>
          <button
            className='hidden md:block text-white w-full py-[16px] rounded-[12px] mt-[16px]'
            style={{ backgroundColor: colorTheme }}
          >
            Заказать еще
          </button>
        </div>
        <div className='flex-1'>
          <div className='order__items'>
            <div className='order__items-top'>
              <h4>Мои заказы</h4>
              <span>{myOrders.length} заказов</span>
            </div>
            {myOrders.map((order) => (
              <Item key={order.id} {...order} />
            ))}
          </div>
          <div className='order__items'>
            <div className='order__items-top'>
              <h4>Мои заказы</h4>
              <span>{allOrders.length} заказов</span>
            </div>
            {allOrders.map((order) => (
              <Item key={order.id} {...order} />
            ))}
          </div>
        </div>
      </div>
      {window.innerWidth < 768 && (
        <footer className='order__footer'>
          <button style={{ backgroundColor: colorTheme }}>Заказать еще</button>
        </footer>
      )}
    </div>
  );
};

export default Order;
