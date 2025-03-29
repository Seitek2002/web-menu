import item1 from 'assets/images/Hero/img-1.png';
import item2 from 'assets/images/Hero/img-2.jpg';

import './style.scss';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Hero = () => {
  return (
    <section className='hero'>
      <div className='hero__content'>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className='hero-swiper'
        >
          <SwiperSlide>
            <div className='hero__item'>
              <img src={item1} alt='' />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='hero__item'>
              <img src={item2} alt='' />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='hero__item'>
              <img src={item2} alt='' />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
