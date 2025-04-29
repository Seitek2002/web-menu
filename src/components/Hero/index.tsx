import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetOrdersQuery } from 'api/Orders.api';

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
  const user = JSON.parse(localStorage.getItem('users') ?? '{}');
  const venue = JSON.parse(localStorage.getItem('venue') ?? '{}');
  const { data: fetchedOrders } = useGetOrdersQuery({
    phone: `${user.phoneNumber}`,
    venueSlug: venue.slug,
  });
  const [orders, setOrders] = useState<IOrder[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedOrders) {
      setOrders(fetchedOrders);
    }
  }, [fetchedOrders]);

  const ws = new WebSocket(
    `wss://imenu.kg/ws/orders/?phone_number=${user.phoneNumber}`
  );

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = (event) => {
    const data: { order_id: number; status: number } = JSON.parse(event.data);
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders?.map((order) => {
        if (order.id === data.order_id) {
          return { ...order, status: data.status };
        }
        return order;
      });
      return updatedOrders;
    });
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };

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
          {orders?.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className='hero__item cursor-pointer'
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
