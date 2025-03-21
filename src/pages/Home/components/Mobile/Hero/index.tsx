import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import OrderStatusCard from "../../../../../components/Mobile/OrderStatusCard";

import one from "../../../../../assets/images/Slider/img-1.png";
import two from "../../../../../assets/images/Slider/img-2.jpg";
import arrow from "../../../../../assets/icons/Hero/arrow.svg";
import icon from "../../../../../assets/icons/Hero/icon.svg";

import "./style.scss";

const Hero: FC = () => {
    const { t } = useTranslation();
    return (
        <Swiper
            className="mobile swiper"
            spaceBetween={8}
            slidesPerView={1.1}
            centeredSlides={true}
        >
            <SwiperSlide>
                <div className="mobile swiper__item">
                    <OrderStatusCard
                        title={t("statusCard.accepted")}
                        message={t("statusCard.review")}
                        status="accepted"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="mobile swiper__item">
                    <OrderStatusCard
                        title={t("message.accepted")}
                        message={t("message.review")}
                        status="pending"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="mobile swiper__item another">
                    <div className="mobile swiper__top">
                        <h4 className="mobile swiper__name text-[#fff]">
                            iMenu.kg
                        </h4>
                        <img src={arrow} alt="arrow" />
                    </div>
                    <p className="mobile swiper__text text-[#DFC0DD]">
                        -{t("swiperText")}
                    </p>

                    <img
                        className="mobile swiper__burger"
                        src={icon}
                        alt="burger"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="mobile swiper__item">
                    <img className="mobile swiper__bg" src={one} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="mobile swiper__item">
                    <img className="mobile swiper__bg" src={two} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="mobile swiper__item">
                    <img className="mobile swiper__bg" src={one} alt="" />
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Hero;
