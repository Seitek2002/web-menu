import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetOrdersByIdQuery } from 'api/Orders.api';
import { useAppSelector } from 'hooks/useAppSelector';
import Item from './components/Item';
import shawarma from 'assets/images/Catalog/item-1.webp';
import burger from 'assets/images/Catalog/item-2.webp';

import headerArrowIcon from 'assets/icons/Busket/header-arrow.svg';
import guy from 'assets/icons/Order/guy.svg';
import pending from 'assets/icons/Order/pending.svg';
// import share from 'assets/icons/Order/share.svg';
import cake from 'assets/images/OrderStatus/cake.png';
import pancakes from 'assets/images/OrderStatus/pancakes.png';
import salad from 'assets/images/OrderStatus/salad.png';

import './style.scss';

// import { loadUsersDataFromStorage } from 'src/utlis/storageUtils';

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
  const params = useParams();
  const { data } = useGetOrdersByIdQuery({ id: Number(params.id) });
  const venueData = useAppSelector((state) => state.yourFeature.venue);
  // const userData = loadUsersDataFromStorage();
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const mainPage = localStorage.getItem('mainPage');

  console.log(data);

  useEffect(() => {
    if (data) {
      const savedOrders = JSON.parse(localStorage.getItem('orders') ?? '[]');
      // Проверяем, нет ли уже в хранилище заказа с таким же id
      const isOrderExist = savedOrders.some(
        (order: { id: number }) => order.id === data.id
      );

      if (!isOrderExist) {
        // Если заказа еще нет, добавляем
        savedOrders.push(data);
        localStorage.setItem('orders', JSON.stringify(savedOrders));
      }
    }
  }, [data]);

  return (
    <div className='order'>
      <header className='order__header'>
        <img
          src={headerArrowIcon}
          alt=''
          onClick={() => navigate(mainPage?.toString() ?? '/')}
        />
        <h3>Мой заказ</h3>
        <div></div>
      </header>
      <div className='md:flex flex-row-reverse items-start gap-[24px]'>
        <div className='order__content'>
          <div className='order__top'>
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
              {venueData?.table?.tableNum && (
                <span style={{ color: colorTheme }}>
                  Стол №{venueData.table.tableNum}
                </span>
              )}
            </div>
            {/* <img src={share} alt='' className='share' /> */}
          </div>
          <div className='order__status-img'>
            {data?.status === 0 ? (
              <img src={pending} alt='' />
            ) : (
              <img src={guy} alt='' />
            )}
          </div>
          {data?.status === 0 ? (
            <h2>
              <svg
                width='20'
                height='21'
                viewBox='0 0 20 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_248_25521)'>
                  <path
                    d='M10 2.5376C8.39303 2.5376 6.82214 3.01412 5.486 3.90691C4.14985 4.79969 3.10844 6.06865 2.49348 7.55329C1.87852 9.03794 1.71762 10.6716 2.03112 12.2477C2.34463 13.8238 3.11846 15.2715 4.25476 16.4078C5.39106 17.5441 6.8388 18.318 8.4149 18.6315C9.99099 18.945 11.6247 18.7841 13.1093 18.1691C14.594 17.5542 15.8629 16.5128 16.7557 15.1766C17.6485 13.8405 18.125 12.2696 18.125 10.6626C18.1227 8.50841 17.266 6.44311 15.7427 4.91987C14.2195 3.39663 12.1542 2.53987 10 2.5376ZM14.375 11.2876H11.5086L13.5672 13.3454C13.6253 13.4035 13.6713 13.4724 13.7027 13.5483C13.7342 13.6242 13.7504 13.7055 13.7504 13.7876C13.7504 13.8697 13.7342 13.951 13.7027 14.0269C13.6713 14.1028 13.6253 14.1717 13.5672 14.2298C13.5091 14.2879 13.4402 14.3339 13.3643 14.3653C13.2884 14.3968 13.2071 14.4129 13.125 14.4129C13.0429 14.4129 12.9616 14.3968 12.8857 14.3653C12.8098 14.3339 12.7409 14.2879 12.6828 14.2298L9.55782 11.1048C9.47031 11.0174 9.4107 10.906 9.38655 10.7847C9.36239 10.6634 9.37477 10.5376 9.42211 10.4234C9.46946 10.3091 9.54964 10.2114 9.65251 10.1428C9.75539 10.0741 9.87632 10.0375 10 10.0376H14.375C14.5408 10.0376 14.6997 10.1034 14.8169 10.2207C14.9342 10.3379 15 10.4968 15 10.6626C15 10.8284 14.9342 10.9873 14.8169 11.1045C14.6997 11.2218 14.5408 11.2876 14.375 11.2876Z'
                    fill='#FF8400'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_248_25521'>
                    <rect
                      width='20'
                      height='20'
                      fill='white'
                      transform='translate(0 0.662598)'
                    />
                  </clipPath>
                </defs>
              </svg>
              Спасибо,заказ в ожидании
            </h2>
          ) : (
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
          )}
          {data?.status === 0 ? (
            <span>
              В ближайшие 5-10 минут администратор свяжется с Вами и уточнит
              детали
            </span>
          ) : (
            <span>Ожидайте в течении 15-20 минут</span>
          )}
          <button
            className='hidden md:block text-white w-full py-[16px] rounded-[12px] mt-[16px]'
            style={{ backgroundColor: colorTheme }}
            onClick={() => navigate(mainPage?.toString() ?? '/')}
          >
            На главную
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
          <button
            style={{ backgroundColor: colorTheme }}
            onClick={() => navigate(mainPage?.toString() ?? '/')}
          >
            На главную
          </button>
        </footer>
      )}
    </div>
  );
};

export default Order;
