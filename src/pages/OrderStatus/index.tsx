import { FC } from "react";

import back from "../../assets/icons/OrderStatus/back.svg";
import share from "../../assets/icons/OrderStatus/share.svg";
import table from "../../assets/icons/OrderStatus/table.svg";
import burger from "../../assets/images/Catalog/item-2.webp";
import cake from "../../assets/images/Catalog/item-5.webp";
import panCake from "../../assets/images/Catalog/item-4.webp";
import doing from "../../assets/images/OrderStatus/doing.png";
import wait from "../../assets/images/OrderStatus/wait.png";
import cencel from "../../assets/images/OrderStatus/cencel.png";
import doingIcon from "../../assets/icons/OrderStatus/doing.svg";
import waitIcont from "../../assets/icons/OrderStatus/wait.svg";

import "./style.scss";

const OrderStatus: FC = () => {
    return (
        <section className="os">
            <div className="container">
                <div className="order__status-head">
                    <div className="order__status-img-wrapper bg-white">
                        <img src={back} alt="back" />
                    </div>
                    <h2 className="order__status-title text-[#090A0B]">Мой заказ</h2>
                    <div className="order__status-img-wrapper bg-white">
                        <img src={share} alt="share" />
                    </div>
                </div>

                <div className="order__status-wrapper">
                    <div className="order__status-list bg-white shadow rounded">
                        <div className="order__status-list-head">
                            <h4 className="order__status-list-title text-[#090A0B]">Мои заказы</h4>
                              <div className="order__status-list-order-quantity text-[#727272]">
                                4 заказов
                            </div>
                        </div>
                        <div className="order__status-list-content divide-y-2 divide-gray-300">
                            <div className="order__status-list-item">
                                <div className="order__status-list-img-wrapper">
                                    <img src={burger} alt="img" />
                                </div>
                                <div className="order__status-list-info-wrapper">
                                    <div className="order__status-list-info">
                                        <h5 className="order__status-list-name text-[#090A0B]">
                                            Бургер стандартный
                                        </h5>
                                        <span className="order__status-list-weight text-[#727272]">
                                            300 г
                                        </span>
                                    </div>
                                    <div className="order__status-list-info">
                                        <span className="order__status-list-price text-[#875AFF]">
                                            500 c
                                        </span>
                                        <span className="order__status-list-quantity text-[#727272]">
                                            2 шт
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="order__status-list-item">
                                <div className="order__status-list-img-wrapper">
                                    <img src={cake} alt="img" />
                                </div>
                                <div className="order__status-list-info-wrapper">
                                    <div className="order__status-list-info">
                                        <h5 className="order__status-list-name text-[#090A0B]">
                                        Шоколадный торт
                                        </h5>
                                        <span className="order__status-list-weight text-[#727272]">
                                        120г
                                        </span>
                                    </div>
                                    <div className="order__status-list-info">
                                        <span className="order__status-list-price text-[#875AFF]">
                                            480 с
                                        </span>
                                        <span className="order__status-list-quantity text-[#727272]">
                                            2 шт
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order__status-list-head another">
                            <h4 className="order__status-list-title text-[#090A0B]">Заказы стола №12</h4>
                            <div className="order__status-list-order-quantity text-[#727272]">
                                5 заказов
                            </div>
                        </div>
                        <div className="order__status-list-content divide-y-2 divide-gray-300">
                            <div className="order__status-list-item">
                                <div className="order__status-list-img-wrapper">
                                    <img src={burger} alt="img" />
                                </div>
                                <div className="order__status-list-info-wrapper">
                                    <div className="order__status-list-info">
                                        <h5 className="order__status-list-name text-[#090A0B]">
                                            Бургер стандартный
                                        </h5>
                                        <span className="order__status-list-weight text-[#727272]">
                                            300 г
                                        </span>
                                    </div>
                                    <div className="order__status-list-info">
                                        <span className="order__status-list-price text-[#875AFF]">
                                            500 c
                                        </span>
                                        <span className="order__status-list-quantity text-[#727272]">
                                            2 шт
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="order__status-list-item">
                                <div className="order__status-list-img-wrapper">
                                    <img src={cake} alt="img" />
                                </div>
                                <div className="order__status-list-info-wrapper">
                                    <div className="order__status-list-info">
                                        <h5 className="order__status-list-name text-[#090A0B]">
                                        Шоколадный торт
                                        </h5>
                                        <span className="order__status-list-weight text-[#727272]">
                                        120г
                                        </span>
                                    </div>
                                    <div className="order__status-list-info">
                                        <span className="order__status-list-price text-[#875AFF]">
                                            480 с
                                        </span>
                                        <span className="order__status-list-quantity text-[#727272]">
                                            2 шт
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="order__status-list-item">
                                <div className="order__status-list-img-wrapper">
                                    <img src={panCake} alt="img" />
                                </div>
                                <div className="order__status-list-info-wrapper">
                                    <div className="order__status-list-info">
                                        <h5 className="order__status-list-name text-[#090A0B]">
                                            Японские панкейки с ягодами и медовым сиропом
                                        </h5>
                                        <span className="order__status-list-weight text-[#727272]">
                                            350 г
                                        </span>
                                    </div>
                                    <div className="order__status-list-info">
                                        <span className="order__status-list-price text-[#875AFF]">
                                            230 с
                                        </span>
                                        <span className="order__status-list-quantity text-[#727272]">
                                            1 шт
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order__status-status bg-white shadow rounded self-start">
                      <h4 className="order__status-status-title text-[#875AFF]"> <img src={table} alt="table" />Стол №12</h4>

                        <img src={doing} alt="doing" className="order__status-status-img" />
                        <div className="order__status-status-share bg-white"><img src={share} alt="doing"  /></div>


                        {/* <img src={doingIcon} alt="doing" /> */}
                        <img src={waitIcont} alt="wait" />
                        {/* <img src={wait} alt="wait" />
                        <img src={cencel} alt="cencel" /> */}

                          <h4 className="order__status-status-subtitle text-[#FF8400]">Спасибо заказ в ожидании</h4>
                          <p className="order__status-status-description text-[#ADADAD]">В ближайшие 5-10 минут администратор свяжется с Вами и уточнит детали</p>

                        <button className="order__status-status-btn text-[#fff]">Заказать еще</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderStatus;
