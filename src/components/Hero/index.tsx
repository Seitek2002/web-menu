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
        <div className='swiper__item another'>  
              <div className="swiper__top">
                <h4 className="swiper__name">Adam Ventures</h4> <img src="/src/assets/icons/hero/arrow.svg" alt="arrow" />
              </div> 
              <p className="swiper__text">Заказывай еду и не трать время! <br/> (Какой нибудь текст про платформу)</p>
            
            <img className='swiper__burger' src="/src/assets/icons/hero/burger.svg" alt="burger" />
          </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='swiper__item'>
          <img className='swiper__bg' src='/src/assets/images/Slider/img-1.png' alt='' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='swiper__item'>
          <img className='swiper__bg' src='/src/assets/images/Slider/img-2.jpg' alt='' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='swiper__item'>
          <img className='swiper__bg' src='/src/assets/images/Slider/img-1.png' alt='' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;
