import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import one from "../../../assets/images/Slider/img-1.png";
import two from "../../../assets/images/Slider/img-2.jpg";
import arrow from "../../../assets/icons/Hero/arrow.svg";
import icon from "../../../assets/icons/Hero/icon.svg";

import "./style.scss";

const Hero: FC = () => {
    return (
        <Swiper
            className="swiper"
            spaceBetween={8}
            slidesPerView={1.2}
            centeredSlides={true}
        >
            <SwiperSlide>
                <div className="swiper__item another">
                    <div className="swiper__top">
                        <h4 className="swiper__name">iMenu.kg</h4>
                        <img src={arrow} alt="arrow" />
                    </div>
                    <p className="swiper__text">
                        Заказывай еду и не трать время! (Какой нибудь текст про
                        платформу)
                    </p>

                    <img className="swiper__burger" src={icon} alt="burger" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="swiper__item">
                    <img className="swiper__bg" src={one} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="swiper__item">
                    <img className="swiper__bg" src={two} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="swiper__item">
                    <img className="swiper__bg" src={one} alt="" />
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Hero;
