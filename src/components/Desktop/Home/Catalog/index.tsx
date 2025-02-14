import { FC, useState } from "react";
import MenuSkeleton from "../../../../skeletons/Menu";
import Item from "./Item";
import FoodDetail from "../FoodDetail";
import { useGetProductsQuery } from "src/api/Products.api";
import { IProductCatalog } from "src/types/products.types";
import { useTranslation } from "react-i18next";
import plus from "../../../../assets/icons/Busket/plus.svg";
import minus from "../../../../assets/icons/Busket/minus.svg";
import burger from "../../../../assets/images/cart/burger.png";

import delet from "../../../../assets/icons/Busket/delete.svg";

import "./style.scss";

interface IProps {
  selectedCategory: number | undefined;
  renameTitleHead: () => void;
}

const Catalog: FC<IProps> = ({ selectedCategory, renameTitleHead }) => {
  const [isShow, setIsShow] = useState(false);
  const [PhotoDetail, setPhotoDetail] = useState<IProductCatalog>();
  const { data: products, isLoading } = useGetProductsQuery({
    category: selectedCategory || undefined,
  });

  const handleClick = (value: boolean) => {
    document.body.style.overflow = value ? "hidden" : "auto";
    setIsShow(value);
  };
  const { t } = useTranslation();

  return (
    <section className="desktop cart">
      <div className="container">
        <div className="cart-content">
          <div className="cart-left">
            <h2 className="cart-title">{t("cartTitle")}</h2>
            <div className="cart-wrapper">
              {isLoading
                ? Array(6)
                    .fill(5)
                    .map(() => <MenuSkeleton key={Math.random()} />)
                : products?.map((item) => (
                    <div onClick={() => setPhotoDetail(item)}>
                      <Item
                        key={item.id}
                        {...item}
                        setIsShow={() => handleClick(true)}
                      />
                    </div>
                  ))}
            </div>
          </div>
          <div className="cart-right">
            <div className="cart-top">
              <h1 className="cart-title">{t("busket.busketTitle")}</h1>
              <div
                className="cart-wrapper-img bg-[#FFF]"
                onClick={renameTitleHead}
              >
                <img src={delet} alt="delete" />
              </div>
            </div>
            <div className="cart-bottom bg-[#FFF]">
              <div className="cart-table bg-[#F1F2F3]">{t("table")}</div>
              <div className="cart-box">
                <img src={burger} alt="" />
                <div className="cart-text">
                  <h3>Салат с креветками много текста </h3>
                  <div className="cart-price">
                    <p className="text-[#875AFF]">450 с</p>
                    <span className="text-[#ADADAD]">•200г</span>
                  </div>
                </div>
                <div className="cart-counter bg-[#F1F2F3]">
                  <img src={minus} alt="" />
                  <p>1</p>
                  <img src={plus} alt="" />
                </div>
              </div>
              <hr />
              <div className="cart-box">
                <img src={burger} alt="" />
                <div className="cart-text">
                  <h3>Салат с креветками много текста </h3>
                  <div className="cart-price">
                    <p className="text-[#875AFF]">450 с</p>
                    <span className="text-[#ADADAD]">•200г</span>
                  </div>
                </div>
                <div className="cart-counter bg-[#F1F2F3]">
                  <img src={minus} alt="" />
                  <p>1</p>
                  <img src={plus} alt="" />
                </div>
              </div>
              <hr />
              <div className="cart-box">
                <img src={burger} alt="" />
                <div className="cart-text">
                  <h3>Салат с креветками много текста </h3>
                  <div className="cart-price">
                    <p className="text-[#875AFF]">450 с</p>
                    <span className="text-[#ADADAD]">•200г</span>
                  </div>
                </div>
                <div className="cart-counter bg-[#F1F2F3]">
                  <img src={minus} alt="" />
                  <p>1</p>
                  <img src={plus} alt="" />
                </div>
              </div>
              <hr />
              <div className="cart-box">
                <img src={burger} alt="" />
                <div className="cart-text">
                  <h3>Салат с креветками много текста </h3>
                  <div className="cart-price">
                    <p className="text-[#875AFF]">450 с</p>
                    <span className="text-[#ADADAD]">•200г</span>
                  </div>
                </div>
                <div className="cart-counter bg-[#F1F2F3]">
                  <img src={minus} alt="" />
                  <p>1</p>
                  <img src={plus} alt="" />
                </div>
              </div>
              <hr />
              <div className="cart-box">
                <img src={burger} alt="" />
                <div className="cart-text">
                  <h3>Салат с креветками много текста </h3>
                  <div className="cart-price">
                    <p className="text-[#875AFF]">450 с</p>
                    <span className="text-[#ADADAD]">•200г</span>
                  </div>
                </div>
                <div className="cart-counter bg-[#F1F2F3]">
                  <img src={minus} alt="" />
                  <p>1</p>
                  <img src={plus} alt="" />
                </div>
              </div>
              <hr />
              <div className="cart-box">
                <img src={burger} alt="" />
                <div className="cart-text">
                  <h3>Салат с креветками много текста </h3>
                  <div className="cart-price">
                    <p className="text-[#875AFF]">450 с</p>
                    <span className="text-[#ADADAD]">•200г</span>
                  </div>
                </div>
                <div className="cart-counter bg-[#F1F2F3]">
                  <img src={minus} alt="" />
                  <p>1</p>
                  <img src={plus} alt="" />
                </div>
              </div>
              <hr />
              <div className="cart-box">
                <img src={burger} alt="" />
                <div className="cart-text">
                  <h3>Салат с креветками много текста </h3>
                  <div className="cart-price">
                    <p className="text-[#875AFF]">450 с</p>
                    <span className="text-[#ADADAD]">•200г</span>
                  </div>
                </div>
                <div className="cart-counter bg-[#F1F2F3]">
                  <img src={minus} alt="" />
                  <p>1</p>
                  <img src={plus} alt="" />
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
      <FoodDetail
        setIsShow={() => handleClick(false)}
        item={PhotoDetail}
        isShow={isShow}
      />
    </section>
  );
};

export default Catalog;
