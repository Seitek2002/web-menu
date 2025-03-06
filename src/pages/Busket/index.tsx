import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "src/store/yourFeatureSlice";

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

    interface IProductModificator {
        id: number;
        name: string;
        price: string;
    }

    const list: {
       id: number;
        productName: string;
        productPrice: string;
        productDescription: string | null;
        productPhoto: string;
        weight: number;
        category: {
          id: number;
          categoryName: string;
        };
        modificators: IProductModificator[]
    }[] = [
        {
          "id": 14,
          "productName": "Borjomi 0.5l",
          "productDescription": null,
          "productPrice": "10.00",
          "weight": 0,
          "productPhoto": "https://joinposter.com/upload/pos_cdb_7631/menu/product_1464609975_1.jpg",
          "category": {
            "id": 9,
            "categoryName": "Cold drinks"
          },
          "modificators": []
        },
        {
          "id": 16,
          "productName": "Capucino 250ml",
          "productDescription": null,
          "productPrice": "3.00",
          "weight": 248,
          "productPhoto": "https://joinposter.com/upload/pos_cdb_7631/menu/product_1464608672_3.jpg",
          "category": {
            "id": 7,
            "categoryName": "Coffee"
          },
          "modificators": []
        },
        {
          "id": 17,
          "productName": "Croissant with chocolate",
          "productDescription": null,
          "productPrice": "4.00",
          "weight": 190,
          "productPhoto": "https://joinposter.com/upload/pos_cdb_7631/menu/product_1464251849_5.jpg",
          "category": {
            "id": 8,
            "categoryName": "Pastry"
          },
          "modificators": []
        },
        {
          "id": 20,
          "productName": "Блины с творогом",
          "productDescription": null,
          "productPrice": "100.00",
          "weight": 0,
          "productPhoto": "https://joinposter.com/upload/pos_cdb_420172/menu/product_1739898117_11.jpeg",
          "category": {
            "id": 10,
            "categoryName": "Завтраки"
          },
          "modificators": []
        },
        {
          "id": 21,
          "productName": "Каша рисовая",
          "productDescription": null,
          "productPrice": "150.00",
          "weight": 0,
          "productPhoto": "https://joinposter.com/upload/pos_cdb_420172/menu/product_1739897994_10.jpeg",
          "category": {
            "id": 10,
            "categoryName": "Завтраки"
          },
          "modificators": []
        },
        {
          "id": 22,
          "productName": "Круассан баварский ",
          "productDescription": null,
          "productPrice": "200.00",
          "weight": 0,
          "productPhoto": "https://joinposter.com/upload/pos_cdb_420172/menu/product_1739898222_12.jpeg",
          "category": {
            "id": 10,
            "categoryName": "Завтраки"
          },
          "modificators": []
        },
      ]
    

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
        renameTitlePlaces()
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
                                    {t("table")}
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
                            {window.innerWidth <= 375 ? (
                                <Forgot list={list.splice(4)} />
                            ) : (
                                <Forgot list={list.splice(3)} />
                            )}
                            
                            <Tips setItemName={setTips}/>
                        </div>
                    ) : (
                        <>
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
                            <Forgot list={list} />  
                        </>
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
