import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import OrderStatusCard from "../../../Mobile/OrderStatusCard";

import one from "../../../../assets/images/Slider/img-1.png";
import two from "../../../../assets/images/Slider/img-2.jpg";
import arrow from "../../../../assets/icons/Hero/arrow.svg";
import icon from "../../../../assets/icons/Hero/icon.svg";

import "./style.scss";

const Hero: FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Swiper
                spaceBetween={8}
                slidesPerView={1.2}
                centeredSlides={true}
                pagination={{
                    el: ".custom-pagination",
                    clickable: true,
                    renderBullet: (_, className) => {
                        return `<span class="${className} pagination-bullet"></span>`;
                    },
                }}
                modules={[Pagination]}
            >
                <SwiperSlide>
                    <div className="swiper__item">
                        <OrderStatusCard
                            title={t("statusCard.accepted")}
                            message={t("statusCard.review")}
                            status="accepted"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper__item">
                        <OrderStatusCard
                            title={t("message.accepted")}
                            message={t("message.review")}
                            status="pending"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper__item another">
                        <div className="swiper__top">
                            <h4 className="swiper__name text-white">iMenu.kg</h4>
                            <img src={arrow} alt="arrow" />
                        </div>
                        <p className="swiper__text">-{t("swiperText")}</p>
                        <img className="swiper__burger" src={icon} alt="burger" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper__item">
                        <img className="swiper__bg" src={one} alt="Slide 1" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper__item">
                        <img className="swiper__bg" src={two} alt="Slide 2" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper__item">
                        <img className="swiper__bg" src={one} alt="Slide 3" />
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className="custom-pagination"></div>
        </>
    );
};

export default Hero;
