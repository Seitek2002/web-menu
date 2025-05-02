import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IBanner, useGetBannersQuery } from 'api/Banners.api';
import { useGetOrdersQuery } from 'api/Orders.api';
import { IOrder } from 'types/orders.types';

import offer1 from 'assets/images/OrderStatus/Offer-1.png';
import offer2 from 'assets/images/OrderStatus/Offer-2.png';

import './style.scss';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { statusMessages } from 'pages/Order/enums';

const Hero = () => {
  const user = JSON.parse(localStorage.getItem('users') ?? '{}');
  const venue = JSON.parse(localStorage.getItem('venue') ?? '{}');
  const navigate = useNavigate();

  const {
    data: fetchedBanners,
    isLoading: bannersLoading,
    isError: bannersError,
  } = useGetBannersQuery();

  const { data: fetchedOrders } = useGetOrdersQuery({
    phone: `${user.phoneNumber}`,
    venueSlug: venue.slug,
  });

  const [orders, setOrders] = useState<IOrder[] | undefined>([]);

  const getStatusData = (serviceMode: number, status: number) => {
    if (!statusMessages[serviceMode]) {
      return {
        text: 'Спасибо, заказ обрабатывается',
        color: 'text-orange-500',
      };
    }
    
    const statusObj =
      statusMessages[serviceMode][status] ||
      statusMessages[serviceMode][0];

    let colorClass = 'text-orange-500';
    if (status === 1) {
      colorClass = 'text-green-500';
    } else if (status === 7) {
      colorClass = 'text-red-500';
    }

    return {
      text: statusObj.title.text,
      color: colorClass,
    };
  };

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
    setOrders((prevOrders) =>
      prevOrders?.map((order) =>
        order.id === data.order_id ? { ...order, status: data.status } : order
      )
    );
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };

  const handleOrderClick = (orderId: number | undefined) => {
    navigate(`/orders/${orderId}`);
  };

  const handleBannerClick = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <section className="hero">
      {bannersLoading && <p>Загрузка баннеров...</p>}
      {bannersError && <p>Ошибка при загрузке баннеров</p>}

      <Swiper
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        className="hero-swiper"
      >
        {orders?.map((order) => {
          const { text, color } = getStatusData(order.serviceMode, order.status);

          return (
            <SwiperSlide key={`order-${order.id}`}>
              <div
                onClick={() => handleOrderClick(order.id)}
                className="hero__item"
                style={{
                  backgroundImage: `url(${
                    order.status === 0 ? offer1 : offer2
                  })`,
                }}
              >
                <p className={`text-base md:text-[32px] font-bold ${color}`}>
                  {text}
                </p>
              </div>
            </SwiperSlide>
          );
        })}

        {fetchedBanners?.map((banner: IBanner) => (
          <SwiperSlide key={`banner-${banner.id}`}>
            <div
              className="hero__item banner__item cursor-pointer"
              onClick={() => handleBannerClick(banner.url)}
            >
              <img src={banner.image} alt={banner.title} />
              <div className="banner__info">
                <h3>{banner.title}</h3>
                <p>{banner.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;