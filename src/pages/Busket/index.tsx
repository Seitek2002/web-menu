import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "src/store/yourFeatureSlice";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setButtonText } from "../../store/yourFeatureSlice";

import Head from "../../components/Mobile/Busket/Head";
import ForgotCart from "src/components/Mobile/Busket/ForgotCart";
import Detail from "../../components/Mobile/Busket/Detail";
import Where from "../../components/Mobile/Busket/Where";
import Price from "../../components/Mobile/Busket/Price";
import Promo from "../../components/Mobile/Busket/Promo";
import Tips from "../../components/Mobile/Busket/Tips";
import Modal from "../../components/Mobile/Busket/Modal";

import cookie from "../../assets/icons/Busket/cookie.svg";
import item1 from "../../assets/images/Catalog/item-1.webp";
import item2 from "../../assets/images/Catalog/item-2.webp";
import item3 from "../../assets/images/Catalog/item-3.webp";
import emptyCartWebp from "../../assets/images/cart/empty-cart.webp";

import "./style.scss";
import CardBusket from "src/components/Cards/Cart";

const Busket: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [length, setLength] = useState(true);
  const cart = useAppSelector((state) => state.yourFeature.items);
  const [title, setTitle] = useState(t("busket.modal.clear"));
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

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
  ];

  const renameTitleHead = () => {
    setModal(true);
    setTitle(t("busket.modal.clear"));
  };

  const renameTitlePlaces = () => {
    setModal(true);
    setTitle("Мест не осталось");
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <section className="busket text-[#090A0B]">
        <div className="container">
          <div className="busket-content">
            <Head renameTitleHead={renameTitleHead} />
            <div className="busket-list divide-y bg-[#fff]">
              {cart.length ? (
                <>
                  <div className="busket-table bg-[#FFF]">{t("table")}</div>
                  {cart.map((item) => (
                    <CardBusket key={item.id} {...item} cartLength={length} />
                  ))}
                </>
              ) : (
                <div className="busket-empty">
                  <h2>Добавьте товары в корзину</h2>
                  <img src={emptyCartWebp} alt="empty-cart-png" />
                  <button onClick={handleClick} className="bg-[#F1F2F3]">
                    В меню
                  </button>
                </div>
              )}
            </div>
            <Detail />
            <Where />
            <Price />
            <Promo renameTitlePlaces={renameTitlePlaces} />

            <div className="busket-forgot">
              <h4 className="busket-forgot-title">
                Ничего не забыли?
                <img src={cookie} alt="cookie" />
              </h4>
              <div className="busket-forgot-wrapper">
                {list.map((item) => (
                  <ForgotCart key={item.id} {...item} />
                ))}
              </div>
            </div>
            <Tips />
          </div>
        </div>

        {modal && (
          <Modal title={title} onClose={() => setModal(false)}>
            {title === t("busket.modal.clear") ? (
              <div className="busket-modal-btns">
                <button
                  onClick={() => {
                    dispatch(clearCart());
                    renameTitleHead(); // Если нужно менять заголовок
                    setModal(false); // Закрываем модальное окно
                  }}
                  className="busket-modal-gray bg-[#F1F2F3] text-[#000]"
                >
                  {t("busket.modal.yes")}
                </button>
                <button
                  onClick={() => setModal(false)}
                  className="busket-modal-purple bg-[#875AFF] text-[#fff]"
                >
                  {t("busket.modal.no")}
                </button>
              </div>
            ) : (
              <>
                <p className="busket-modal-text text-[#727272]">
                  {t("busket.modal.arrange")}
                </p>
                <button
                  onClick={() => setModal(false)}
                  className="busket-modal-btn text-[#090A0B] bg-[#F1F2F3]"
                >
                  {t("busket.modal.myself")}
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
