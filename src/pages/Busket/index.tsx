import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "src/store/yourFeatureSlice";
import { useParams } from 'react-router-dom';

import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setButtonText } from "../../store/yourFeatureSlice";

import Head from "../../components/Mobile/Busket/Head";
import Detail from "../../components/Mobile/Busket/Detail";
import OrderType from "../../components/Mobile/Busket/OrderType";
import Price from "../../components/Mobile/Busket/Price";
import Promo from "../../components/Mobile/Busket/PromoCode";
import Tips from "../../components/Mobile/Busket/Tips";
import Modal from "../../components/Mobile/Busket/Modal";
import Forgot from "src/components/Mobile/Busket/Forgot/Forgot";
import CardBusket from "src/components/Cards/Cart";
import Empty from "src/components/Mobile/Busket/Empty";
import Footer from "src/components/Mobile/Footer";

import item1 from "../../assets/images/Catalog/item-1.webp";
import item2 from "../../assets/images/Catalog/item-2.webp";
import item3 from "../../assets/images/Catalog/item-3.webp";

import "./style.scss";

const Busket: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [length, setLength] = useState(true);
    const cart = useAppSelector((state) => state.yourFeature.items);
    const [title, setTitle] = useState(t("busket.modal.clear"));
    const [modal, setModal] = useState(false);
    const [tips, setTips] = useState("")
    const { table } = useParams<{ table?: string }>(); // Получаем номер стола из URL

    useEffect(() => {
        dispatch(setButtonText("Далее"));
        if (cart.length <= 2) {
            setLength(true);
        } else {
            setLength(false);
        }
        return () => {
            dispatch(setButtonText("Заказать!"));
        };
    }, [cart.length, dispatch]);

    const list: {
        id: number;
        name: string;
        weight: number;
        price: number;
        img: string;
        discount: number;
        promotion: boolean;
    }[] = [
        {
            id: 0,
            name: "Твистер Деклюкс острый",
            weight: 200,
            price: 240,
            img: item1,
            discount: 10,
            promotion: false,
        },
        {
            id: 1,
            name: "Куриный шницель с картофельным пюре",
            weight: 300,
            price: 350,
            img: item2,
            discount: 0,
            promotion: true,
        },
        {
            id: 2,
            name: "Греческий салат с оливками",
            weight: 250,
            price: 180,
            img: item3,
            discount: 0,
            promotion: true,
        },
    ];

    const renameTitleHead = () => {
        setModal(true);
        setTitle(t("busket.modal.clear"));
    };

    const renameTitlePlaces = () => {
        setModal(true);
        setTitle("Мест не осталось");
    };

    const modalGray = () => {
        dispatch(clearCart());
        renameTitleHead();
        setModal(false);
    };

    return (
        <>
            <section className="busket text-[#090A0B]">
                <div className="container">
                    <Head renameTitleHead={renameTitleHead} />
                    {window.innerWidth <= 768 ? (
                        <div className="busket__content">
                            {cart.length ? (
                                <div className="busket__table bg-[#FFF]">
                                    {table ? `Стол №${table}` : 'Выберите стол'}
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="busket__list divide-y bg-[#fff]">
                                {cart.length ? (
                                    <>
                                        {cart.map((item) => (
                                            <CardBusket
                                                key={item.id}
                                                {...item}
                                                cartLength={length}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <Empty />
                                )}
                            </div>
                            <Detail />
                            <OrderType />
                            <Price tips={tips} />
                            <Promo renameTitlePlaces={renameTitlePlaces} />
                            <Forgot list={list} />
                            <Tips setItemName={setTips}/>
                        </div>
                    ) : (
                        <div className="busket-desktop">
                            <div className="busket-desktop__left bg-[#fff]">
                                <Detail />
                                <OrderType />
                                <Price tips={tips} />
                                <Tips setItemName={setTips}/>
                            </div>
                            <div className="busket-desktop__right bg-[#fff]">
                                <div className="busket__table desktop bg-[#F1F2F3]">{t("table")}</div>
                                <div className="busket__list divide-y desktop bg-[#fff]">
                                    {cart.length ? (
                                        <>
                                            {cart.map((item) => (
                                                <CardBusket
                                                    key={item.id}
                                                    {...item}
                                                    cartLength={length}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <Empty />
                                    )}
                                </div>
                                <Footer position="absolute"  />
                            </div>
                        </div>
                        
                    )}
                </div>

                {modal && (
                    <Modal title={title} onClose={() => setModal(false)}>
                        {title === t("busket.modal.clear") ? (
                            <div className="busket__modal-btns">
                                <button
                                    onClick={() => modalGray()}
                                    className="busket__modal-gray bg-[#F1F2F3] text-[#000]"
                                >
                                    {t("busket.modal.yes")}
                                </button>
                                <button
                                    onClick={() => setModal(false)}
                                    className="busket__modal-purple bg-[#875AFF] text-[#fff]"
                                >
                                    {t("busket.modal.no")}
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="busket__modal-text text-[#727272]">
                                    {" "}
                                    {t("busket.modal.arrange")}{" "}
                                </p>
                                <button
                                    onClick={() => setModal(false)}
                                    className="busket__modal-btn text-[#090A0B] bg-[#F1F2F3]"
                                >
                                    {" "}
                                    {t("busket.modal.myself")}{" "}
                                </button>
                            </>
                        )}
                    </Modal>
                )}
            </section>
        </>
    );
};

export default Busket;
