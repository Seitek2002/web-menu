import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import './style.scss';

const Hero: FC = () => {
  return (
    <Swiper
      className='swiper'
      spaceBetween={8}
      slidesPerView={1.2}
      centeredSlides={true}
    >
      <SwiperSlide>
        <div className='swiper__item'>
          <img src='/src/assets/images/Slider/img-1.png' alt='' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='swiper__item'>
          <img src='/src/assets/images/Slider/img-2.jpg' alt='' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='swiper__item'>
          <img src='/src/assets/images/Slider/img-1.png' alt='' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;
