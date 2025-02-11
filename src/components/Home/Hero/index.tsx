import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import OrderStatusCard from "../../OrderStatusCard";

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
                <div className="swiper__item">
                    <OrderStatusCard
                        title="Ваш заказ принят!"
                        message="Ожидайте в течении 15-20 минут"
                        status="accepted"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="swiper__item">
                    <OrderStatusCard
                        title="Ваш заказ в рассмотрении"
                        message="В ближайшее время админ свяжется с Вами и уточнит детали"
                        status="pending"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="swiper__item another">
                    <div className="swiper__top">
                        <h4 className="swiper__name text-[#fff]">iMenu.kg</h4>
                        <img src={arrow} alt="arrow" />
                    </div>
                    <p className="swiper__text text-[#DFC0DD]">
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
