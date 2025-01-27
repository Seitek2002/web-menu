import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setButtonText } from '../../store/yourFeatureSlice';

import Item from "../../components/Busket/Item";

import back from "../../assets/icons/Busket/back.svg";
import delet from "../../assets/icons/Busket/delete.svg";
import checkbox from "../../assets/icons/Busket/checkbox.svg";
import priceArrow from "../../assets/icons/Busket/priceArrow.svg";
import cookie from "../../assets/icons/Busket/cookie.svg";
import added from "../../assets/icons/Busket/added.svg";
import adding from "../../assets/icons/Busket/adding.svg";
import ava from "../../assets/icons/Busket/ava.svg";
import first from "../../assets/icons/Busket/first.svg";

import item1 from "../../assets/images/Catalog/item-1.webp";
import item2 from "../../assets/images/Catalog/item-2.webp";
import item3 from "../../assets/images/Catalog/item-3.webp";
import item4 from "../../assets/images/Catalog/item-4.webp";
import item5 from "../../assets/images/Catalog/item-5.webp";
import item6 from "../../assets/images/Catalog/item-6.webp";
import item7 from "../../assets/images/Catalog/item-7.webp";

import "./style.scss";



const Busket: FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [length, setLength] = useState(true);

     const cart = useAppSelector(state => state.yourFeature.items); 

    const formatPhoneNumber = (input: string) => {
      const digits = input.replace(/\D/g, "");
  
      const maxDigits = 12;
      const limitedDigits = digits.slice(0, maxDigits);
  
      let formatted = "+996";
      if (limitedDigits.length > 3) {
        formatted += ` (${limitedDigits.slice(3, 6)}`;
      }
      if (limitedDigits.length > 6) {
        formatted += `) ${limitedDigits.slice(6, 9)}`;
      }
      if (limitedDigits.length > 9) {
        formatted += `-${limitedDigits.slice(9, 12)}`;
      }
  
      return formatted;
    };

    useEffect(() => {
        dispatch(setButtonText('Далее'));

        return () => {
          dispatch(setButtonText('Заказать'));
        };
      }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const formattedInput = formatPhoneNumber(input);
        setValue(formattedInput);
      };
  
    

    const list: {
        id: string;
        name: string;
        weight: number;
        price: number;
        img: string;
        discount: number;
        promotion: boolean;
    }[] = [
        {
            id: "0",
            name: "Твистер Деклюкс острый",
            weight: 200,
            price: 240,
            img: item1,
            discount: 10,
            promotion: false,
        },
        {
            id: "1",
            name: "Куриный шницель с картофельным пюре",
            weight: 300,
            price: 350,
            img: item2,
            discount: 0,
            promotion: true,
        },
        {
            id: "2",
            name: "Греческий салат с оливками",
            weight: 250,
            price: 180,
            img: item3,
            discount: 0,
            promotion: true,
        },
        {
            id: "3",
            name: "Паста с морепродуктами",
            weight: 350,
            price: 420,
            img: item4,
            discount: 15,
            promotion: false,
        },
        {
            id: "4",
            name: "Бургер с беконом и сыром",
            weight: 250,
            price: 290,
            img: item5,
            discount: 7,
            promotion: false,
        },
        {
            id: "5",
            name: "Ризотто с грибами",
            weight: 300,
            price: 330,
            img: item6,
            discount: 0,
            promotion: false,
        },
        {
            id: "6",
            name: "Суп-пюре из брокколи с кремом",
            weight: 250,
            price: 220,
            img: item7,
            discount: 10,
            promotion: false,
        },
        {
            id: "7",
            name: "Стейк с картофелем фри",
            weight: 400,
            price: 550,
            img: item1,
            discount: 20,
            promotion: false,
        },
        {
            id: "8",
            name: "Лосось, запеченный с лимоном",
            weight: 280,
            price: 480,
            img: item3,
            discount: 0,
            promotion: false,
        },
        {
            id: "9",
            name: "Цезарь с курицей",
            weight: 350,
            price: 370,
            img: item2,
            discount: 0,
            promotion: false,
        },
    ];

    useEffect(() => {
        if (cart.length >= 6) {
            setLength(false);
        } else {
            setLength(true);
        }
    }, []);

    return (
        <>
            <section className="c">
                <div className="container">
                    <div className="c-content">
                        <div className="c-top">
                            <Link to="/" className="c-wrapper-img">
                                <img src={back} alt="back" />
                            </Link>
                            <h1 className="c-title">Корзина</h1>
                            <div className="c-wrapper-img">
                                <img src={delet} alt="delete" />
                            </div>
                        </div>

                        <div className="c-table">Стол №12</div>

                        <div className="c-list divide-y">
                            {cart.map((item) => (
                                <Item key={item.id} {...item} length={length} />
                            ))}
                        </div>

                        <div className="c-detail">
                            <div className="c-detail-top">
                                <h4 className="c-detail-name">Детали</h4>
                                <h4 className="c-detail-required">
                                    Обязательно*
                                </h4>
                            </div>
                            <input
                                className="c-detail-input first"  
                                id="phone"
                                type="text"
                                value={value}
                                onChange={handleInputChange}
                                maxLength={18} 
                                placeholder="+996 700 000 000"
                            />
                            
                            <input
                                type="text"
                                className="c-detail-input"
                                placeholder="Напишите время заказа или коментарий"
                            />
                        </div>

                        <div className="c-where">
                            <div className="c-where-wrapper">
                                <div className="c-where-checkbox"></div> С собой
                            </div>
                            <div className="c-where-wrapper">
                                <img src={checkbox} alt="check" /> В заведении
                            </div>
                        </div>

                        <div className="c-price">
                            <div className="c-price-top">
                                Детали суммы
                                <img src={priceArrow} alt="arrow" />
                            </div>
                            <div className="c-price-wrapper divide-y">
                                <div className="c-price-item">
                                    Общая стоимость
                                    <div className="c-price-total all">
                                        1350 с
                                    </div>
                                </div>
                                <div className="c-price-item">
                                    Скидка
                                    <div className="c-price-total discount">
                                        -23 с
                                    </div>
                                </div>
                                <div className="c-price-item">
                                    Бонусы
                                    <div className="c-price-total bonus">
                                        +99 б
                                    </div>
                                </div>
                                <div className="c-price-item">
                                    Обслуживание
                                    <div className="c-price-total service">
                                        230 с
                                    </div>
                                </div>
                            </div>
                            <div className="c-price-ress">
                                Итоговая сумма <span>1200 с</span>
                            </div>
                        </div>

                        <div className="c-promo">
                            <input type="text" placeholder="Введите промокод" />
                            <button>Применить</button>
                        </div>

                        <div className="c-forgot">
                            <h4 className="c-forgot-title">
                                Ничего не забыли?
                                <img src={cookie} alt="cookie" />
                            </h4>
                            <div className="c-forgot-wrapper">
                                {list.slice(0, 3).map((item) => (
                                    <div
                                        key={item.id}
                                        className="c-forgot-cart"
                                    >
                                        <div className="c-forgot-inner">
                                            {item.promotion ? (
                                                <div className="c-forgot-added">
                                                    <img src={added} alt="✅" />
                                                </div>
                                            ) : (
                                                <div className="c-forgot-adding">
                                                    <img src={adding} alt="+" />
                                                </div>
                                            )}
                                        </div>
                                        <img
                                            src={item.img}
                                            className="c-forgot-img"
                                            alt="img"
                                        />
                                        <div className="c-forgot-info">
                                            <span className="c-forgot-price">
                                                {item.price} с
                                            </span>
                                            <span className="c-forgot-weight">
                                                •{item.weight}г
                                            </span>
                                        </div>
                                        <p className="c-forgot-name">
                                            {item.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="c-tips">
                            <h3 className="c-tips-title">Чаевые</h3>
                            <div className="c-tips-info">
                                <div className="c-tips-ava">
                                    <img src={ava} alt="ava" />
                                </div>
                                <div className="c-tips-inner">
                                    <span className="c-tips-job">Официант</span>
                                    <span className="c-tips-name">
                                        Имнакулов Дамир
                                    </span>
                                </div>
                            </div>
                            <div className="c-tips-wrapper">
                                <div className="c-tips-item active">
                                    <img src={first} alt="icon" />
                                </div>
                                <div className="c-tips-item">50 c</div>
                                <div className="c-tips-item">100 c</div>
                                <div className="c-tips-item">15 %</div>
                                <div className="c-tips-item">20 %</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Busket;
