import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetOrdersByIdQuery } from 'api/Orders.api';
import { IOrderById } from 'types/orders.types';
import { useAppSelector } from 'hooks/useAppSelector';
import Item from './components/Item';

import { statusMessages } from './enums';

import headerArrowIcon from 'assets/icons/Busket/header-arrow.svg';
import priceArrow from 'assets/icons/Busket/price-arrow.svg';

import './style.scss';

// function formatCreatedAt(dateString: string) {
//   const date = new Date(dateString);

//   return date.toLocaleString('ru-RU', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// }

const Order = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const user = JSON.parse(localStorage.getItem('users') ?? '{}');
  const params = useParams();
  const { data } = useGetOrdersByIdQuery({
    id: Number(params.id),
  });
  const venueData = useAppSelector((state) => state.yourFeature.venue);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const mainPage = localStorage.getItem('mainPage');

  const [order, setOrder] = useState<IOrderById | null>(null);

  useEffect(() => {
    if (data) {
      setOrder(data);
      const savedOrders = JSON.parse(localStorage.getItem('orders') ?? '[]');
      const isOrderExist = savedOrders.some(
        (order: { id: number }) => order.id === data.id
      );
      if (!isOrderExist) {
        savedOrders.push(data);
        localStorage.setItem('orders', JSON.stringify(savedOrders));
      }
    }
  }, [data]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://imenu.kg/ws/orders/?phone_number=${user.phoneNumber}&site=imenu`
    );

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const wsData: { order_id: number; status: number } = JSON.parse(
        event.data
      );
      // Only update if the order_id matches the current order
      if (wsData.order_id === Number(params.id)) {
        setOrder((prevOrder) =>
          prevOrder ? { ...prevOrder, status: wsData.status } : prevOrder
        );
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, [params.id, user.phoneNumber]);

  const handleNavigate = () => {
    navigate(mainPage?.toString() ?? '/');
  };

  const solveTotalSum = () => {
    if (data) {
      const subtotal = data.orderProducts.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      const cartSum = subtotal + subtotal * (venueData.serviceFeePercent / 100);

      return cartSum;
    } else {
      return 0;
    }
  };

  const currentStatus =
    order?.status && data?.serviceMode
      ? statusMessages[data.serviceMode]?.[order.status]
      : null;

  return (
    <div className='order'>
      <header className='order__header'>
        <img src={headerArrowIcon} alt='' onClick={handleNavigate} />
        <h3>Мой заказ</h3>
        <div></div>
      </header>

      <div className='md:flex flex-row-reverse items-start gap-[24px]'>
        {/* Левая часть (или верхняя в мобильной верстке) */}
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
                <g clipPath='url(#clip0_381_59651)'>
                  <path
                    d='M15.5 2.5H5.5C5.15482 2.5 4.875 2.77982 4.875 3.125V6.875C4.875 7.22018 5.15482 7.5 5.5 7.5H15.5C15.8452 7.5 16.125 7.22018 16.125 6.875V3.125C16.125 2.77982 15.8452 2.5 15.5 2.5Z'
                    stroke={colorTheme}
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M16.75 11.25H4.25C3.90482 11.25 3.625 11.5298 3.625 11.875V13.125C3.625 13.4702 3.90482 13.75 4.25 13.75H16.75C17.0952 13.75 17.375 13.4702 17.375 13.125V11.875C17.375 11.5298 17.0952 11.25 16.75 11.25Z'
                    stroke={colorTheme}
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7.375 7.5V11.25'
                    stroke={colorTheme}
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M13.625 7.5V11.25'
                    stroke={colorTheme}
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M15.5 13.75V17.5'
                    stroke={colorTheme}
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M5.5 13.75V17.5'
                    stroke={colorTheme}
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
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
              {data?.serviceMode == 1 && (
                <span style={{ color: colorTheme }}>
                  Стол №{venueData.table.tableNum}
                </span>
              )}
            </div>
          </div>

          {currentStatus && (
            <>
              <div className='order__status-img'>
                <img src={currentStatus.icon} alt='' />
              </div>
              <h2>
                <img src={currentStatus.title.icon} alt='' />
                {currentStatus.title.text}
              </h2>
              <span>{currentStatus.description}</span>
            </>
          )}

          <div className='font-bold text-[24px]'>
            №{order?.id}
            <div className='barcode'>
              <QRCode value={'IMENU.KG/ORDERS/' + order?.id} />
            </div>
          </div>

          <div className='text-lg'>
            <h4>Телефон: +{data?.phone}</h4>
            <h4>Адрес: {data?.address}</h4>
          </div>

          <button
            className='hidden md:block text-white w-full py-[16px] rounded-[12px] mt-[16px]'
            style={{ backgroundColor: colorTheme }}
            onClick={handleNavigate}
          >
            На главную
          </button>
        </div>

        {/* Правая часть (или нижняя в мобильной верстке) */}
        <div className='flex-1'>
          <div className='cart__sum bg-[#fff]'>
            <div
              onClick={() => setActive(!active)}
              className='cart__sum-top text-[#80868B]'
            >
              Детали суммы
              <img
                src={priceArrow}
                alt='arrow'
                className={active ? 'cart__sum-img active' : 'cart__sum-img'}
              />
            </div>
            <div
              className={
                active
                  ? 'cart__sum-wrapper divide-y active'
                  : 'cart__sum-wrapper divide-y'
              }
              style={{
                height: active ? '80px' : '0',
              }}
            >
              <div className='cart__sum-item text-[#80868B]'>
                Общая стоимость
                <div className='cart__sum-total all text-[#80868B]'>
                  {data?.orderProducts.reduce(
                    (acc, item) => acc + item.price * item.count,
                    0
                  )}{' '}
                  c
                </div>
              </div>
              <div className='cart__sum-item text-[#80868B]'>
                Обслуживание
                <div className='cart__sum-total service'>
                  {venueData.serviceFeePercent}%
                </div>
              </div>
            </div>
            <div className='cart__sum-ress border-[#f3f3f3]'>
              Итоговая сумма <span>{solveTotalSum()} c</span>
            </div>
          </div>
          <div className='order__items'>
            <div className='order__items-top'>
              <h4>Мои заказы</h4>
              <span>{order?.orderProducts?.length ?? 0} заказов</span>
            </div>

            {order?.orderProducts?.map((orderProduct) => (
              <Item
                key={orderProduct.product.id}
                img={orderProduct.product.productPhoto}
                name={orderProduct.product.productName}
                price={Number(orderProduct.price)}
                weight={orderProduct.product.weight}
                quantity={orderProduct.count}
              />
            ))}
          </div>
        </div>
      </div>

      {window.innerWidth < 768 && (
        <footer className='order__footer'>
          <button
            style={{ backgroundColor: colorTheme }}
            onClick={handleNavigate}
          >
            На главную
          </button>
        </footer>
      )}
    </div>
  );
};

export default Order;
