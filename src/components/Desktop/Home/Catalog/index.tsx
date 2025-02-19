import { FC } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "src/store/yourFeatureSlice";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/hooks/useAppSelector";
import CardBusket from "src/components/Cards/Cart";
import Footer from "src/components/Mobile/Footer";
import Menu from "src/components/Menu";

import delet from "../../../../assets/icons/Busket/delete.svg";

import "./style.scss";

interface IProps {
  selectedCategory: number | undefined;
  renameTitleHead: () => void;
}

const Catalog: FC<IProps> = ({ selectedCategory, renameTitleHead }) => {
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.yourFeature.items);
  const dispatch = useDispatch();

  return (
    <section className="desktop cart">
      <div className="container">
        <div className="cart-content">
          <div className="cart-left">
            <Menu selectedCategory={selectedCategory} />
          </div>
          <div className="cart-right relative">
            <div className="cart-top">
              <h1 className="cart-title">{t("busket.busketTitle")}</h1>
              <div
                className="cart-wrapper-img bg-[#FFF]"
                onClick={() => {
                  dispatch(clearCart());
                  renameTitleHead(); // Если нужно менять заголовок
                }}
              >
                <img src={delet} alt="delete" />
              </div>
            </div>
            <div className="cart-bottom bg-[#FFF]">
              <div className="cart-table bg-[#F1F2F3]">{t("table")}</div>
              {cart.map((item) => (
                <>
                  <CardBusket
                    key={item.id}
                    {...item}
                    cartLength={!!cart.length}
                  />
                </>
              ))}
            </div>
            <Footer position="absolute" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
