import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') ?? '[]');
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!orders.length) return;
      const updated = await Promise.all(
        orders.map(async (order) => {
          const { data } = await getStatus({ id: order.id });
          return {
            ...order,
            status: data?.status ?? order.status,
          };
        })
      );
      setOrders(updated);
      localStorage.setItem('orders', JSON.stringify(updated));
    }, 30000);
    return () => clearInterval(intervalId);
  }, [orders, getStatus]);

  const handleSlideClick = (orderId: number) => {
    navigate(`/orders/${orderId}`);
  };

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
              <div
                className='hero__item'
                onClick={() => handleSlideClick(item.id)}
              >
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
