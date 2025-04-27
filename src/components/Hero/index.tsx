// Пример Hero.tsx
import { useEffect, useState } from 'react';

import { useLazyGetOrdersByIdQuery } from 'api/Orders.api';

import offer1 from 'assets/images/OrderStatus/Offer-1.png';
import offer2 from 'assets/images/OrderStatus/Offer-2.png';

import './style.scss';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IOrder {
  id: number;
  status: number;
}

const Hero = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [getStatus] = useLazyGetOrdersByIdQuery();

  // При первом рендере читаем заказы из localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') ?? '[]');
    setOrders(savedOrders);
  }, []);

  // Запускаем интервал, который каждые 30с делает запрос для каждого заказа
  useEffect(() => {
    const intervalId = setInterval(async () => {
      // Если заказов нет, выходим
      if (!orders.length) return;

      // Делаем параллельные запросы для каждого заказа
      // и получаем массив «обновлённых» заказов
      const updated = await Promise.all(
        orders.map(async (order) => {
          const { data } = await getStatus({ id: order.id });
          // Предположим, что в data приходит { status: number }
          // Дополнительно подмешаем старые поля заказа, если нужно.
          return {
            ...order,
            status: data?.status ?? order.status,
          };
        })
      );

      // Обновляем стейт и localStorage
      setOrders(updated);
      localStorage.setItem('orders', JSON.stringify(updated));
    }, 30000);

    // При размонтировании компонента удаляем интервал
    return () => clearInterval(intervalId);
  }, [orders, getStatus]);

  return (
    <section className='hero'>
      <div className='hero__content'>
        <Swiper
          pagination={{ dynamicBullets: true }}
          modules={[Pagination]}
          className='hero-swiper'
        >
          {orders.map((item) => (
            <SwiperSlide key={item.id}>
              <div className='hero__item'>
                {/* Например, подставляем разные картинки в зависимости от статуса */}
                <img src={item.status === 0 ? offer1 : offer2} alt='' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
