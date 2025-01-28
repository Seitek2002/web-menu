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
import ForgotCart from "src/components/Busket/ForgotCart";



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
        if (cart.length <= 5) {
            setLength(true)
        } else {
            setLength(false)
        }
        return () => {
          dispatch(setButtonText('Заказать'));
        };
      }, [cart.length]);

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

    return (
        <>
            <section className="busket">
                <div className="container">
                    <div className="busket-content">
                        <div className="busket-top">
                            <Link to="/" className="busket-wrapper-img">
                                <img src={back} alt="back" />
                            </Link>
                            <h1 className="busket-title">Корзина</h1>
                            <div className="busket-wrapper-img">
                                <img src={delet} alt="delete" />
                            </div>
                        </div>

                        <div className="busket-table">Стол №12</div>

                        <div className="busket-list divide-y">
                            {cart.map((item) => (
                                <Item key={item.id} {...item} cartLength={length}/>
                            ))}
                        </div>

                        <div className="busket-detail">
                            <div className="busket-detail-top">
                                <h4 className="busket-detail-name">Детали</h4>
                                <h4 className="busket-detail-required">
                                    Обязательно*
                                </h4>
                            </div>
                            <input
                                className="busket-detail-input first"  
                                id="phone"
                                type="text"
                                value={value}
                                onChange={handleInputChange}
                                maxLength={18} 
                                placeholder="+996 700 000 000"
                            />
                            
                            <input
                                type="text"
                                className="busket-detail-input"
                                placeholder="Напишите время заказа или коментарий"
                            />
                        </div>

                        <div className="busket-where">
                            <div className="busket-where-wrapper">
                                <div className="busket-where-checkbox"></div> С собой
                            </div>
                            <div className="busket-where-wrapper">
                                <img src={checkbox} alt="check" /> В заведении
                            </div>
                        </div>

                        <div className="busket-price">
                            <div className="busket-price-top">
                                Детали суммы
                                <img src={priceArrow} alt="arrow" />
                            </div>
                            <div className="busket-price-wrapper divide-y">
                                <div className="busket-price-item">
                                    Общая стоимость
                                    <div className="busket-price-total all">
                                        1350 с
                                    </div>
                                </div>
                                <div className="busket-price-item">
                                    Скидка
                                    <div className="busket-price-total discount">
                                        -23 с
                                    </div>
                                </div>
                                <div className="busket-price-item">
                                    Бонусы
                                    <div className="busket-price-total bonus">
                                        +99 б
                                    </div>
                                </div>
                                <div className="busket-price-item">
                                    Обслуживание
                                    <div className="busket-price-total service">
                                        230 с
                                    </div>
                                </div>
                            </div>
                            <div className="busket-price-ress">
                                Итоговая сумма <span>1200 с</span>
                            </div>
                        </div>

                        <div className="busket-promo">
                            <input type="text" placeholder="Введите промокод" />
                            <button>Применить</button>
                        </div>

                        <div className="busket-forgot">
                            <h4 className="busket-forgot-title">
                                Ничего не забыли?
                                <img src={cookie} alt="cookie" />
                            </h4>
                            <div className="busket-forgot-wrapper">

                                {list.slice(0, 3).map((item) => (
                                   <ForgotCart key={item.id} {...item} />
                                ))}
                            </div>
                        </div>

                        <div className="busket-tips">
                            <h3 className="busket-tips-title">Чаевые</h3>
                            <div className="busket-tips-info">
                                <div className="busket-tips-ava">
                                    <img src={ava} alt="ava" />
                                </div>
                                <div className="busket-tips-inner">
                                    <span className="busket-tips-job">Официант</span>
                                    <span className="busket-tips-name">
                                        Имнакулов Дамир
                                    </span>
                                </div>
                            </div>
                            <div className="busket-tips-wrapper">
                                <div className="busket-tips-item active">
                                    <img src={first} alt="icon" />
                                </div>
                                <div className="busket-tips-item">50 c</div>
                                <div className="busket-tips-item">100 c</div>
                                <div className="busket-tips-item">15 %</div>
                                <div className="busket-tips-item">20 %</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Busket;
