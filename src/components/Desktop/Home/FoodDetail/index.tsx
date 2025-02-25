import { FC, useState } from "react";
import { IProductCatalog } from "src/types/products.types";
import { useGesture } from "@use-gesture/react";
import { useTranslation } from "react-i18next";

import addContainer from "./add-container.svg";
import close from "./close.svg";
import minus from "./minus.svg";
import plus from "./plus.svg";

import "./style.scss";

interface IProps {
  item?: IProductCatalog;
  setIsShow: () => void;
  isShow: boolean;
}

const FoodDetail: FC<IProps> = ({ setIsShow, item, isShow }) => {
  const [sugar, setSugar] = useState<"with" | "without">("with");
  const [containerAdd, setContainerAdd] = useState(0);
  const [counter, setCounter] = useState(1);
  const [productCounter, setProductCounter] = useState(1);
  const [containerCounter, setContainerCounter] = useState(0);

  const [selectedSize, setSelectedSize] = useState("Маленький");

  const handleProductCounterChange = (delta: number) => {
    setProductCounter((prev) => Math.max(1, prev + delta));
  };

  const handleContainerCounterChange = (delta: number) => {
    setContainerCounter((prev) => Math.max(0, prev + delta));
  };

  const sizes = ["small", "medium", "large"];
  const handleDone = () => {
    const selectedData = {
      sugar,
      containerAdd,
      counter,
    };

    console.log("Выбранные данные:", selectedData);
  };

  const { t } = useTranslation();

  return (
    <>
      <div className={"food-detailll" + (isShow ? " active" : "")}>
        <div className="food-detailll__bg bg-[#000]"></div>
        <div className="food-detailll__wrapper bg-[#fff]">
          <img
            src={close}
            alt=""
            className="food-detailll__close"
            onClick={setIsShow}
          />
          <img
            src={item?.productPhoto}
            alt="img"
            className="food-detailll__img"
          />
          <div className="food-detailll__content ">
            <div className="food-detailll__head">
              <h3 className="food-detailll__title text-[#090A0B]">
                {item?.productName}
              </h3>
              <p className="food-detailll__price text-[#875AFF]">
                {item?.productPrice} с
              </p>
            </div>
            <p className="food-detailll__description text-[#090A0B]">
              {item?.productDescription} Кофейный напиток с добавлением молока и
              двух шотов эспрессо, так же можно добавить сахарили сироп
            </p>
            <div className="food-detailll__btns">
              <div className="food-detailll__quantity-btn bg-[#F1F2F3] text-[#090A0B]">
                <img
                  src={minus}
                  alt="minus"
                  onClick={() => handleProductCounterChange(-1)}
                />
                {productCounter}
                <img
                  src={plus}
                  alt="plus"
                  onClick={() => handleProductCounterChange(1)}
                />
              </div>
              <button className="food-detailll__add-btn text-[#fff] bg-[#875AFF]">
                Добавить
              </button>
            </div>
            <div className="food-detailll__lil-head">
              <h4 className="food-detailll__lil-head-sabtitle text-[#090A0B]">
                {t("size.sizeChoose")}
              </h4>
              <h4 className="food-detailll__lil-head-required text-[#875AFF]">
                {t("foodDetail.ingredients.necessarily")}
              </h4>
            </div>
            <div className="food-detailll__size">
              {sizes.map((sizeKey, index) => (
                <div
                  key={index}
                  className={`food-detailll__size-item bg-[#F1F2F3] ${
                    selectedSize === sizeKey
                      ? "active border border-[#875AFF] bg-[#fff]"
                      : ""
                  }`}
                  onClick={() => setSelectedSize(sizeKey)}
                >
                  <span className="food-detailll__size-title text-[#090A0B]">
                    {t(`size.${sizeKey}`)}
                  </span>
                  <div className="food-detailll__size-price text-[#626576]">
                    {t(`size.price.${sizeKey}`)}
                  </div>
                </div>
              ))}
            </div>
            <div className="food-detailll__container">
              <div className="food-detailll__container-btn">
                <img
                  src={minus}
                  alt="minus"
                  onClick={() => handleContainerCounterChange(-1)}
                />
                {containerCounter}
                <img
                  src={plus}
                  alt="plus"
                  onClick={() => handleContainerCounterChange(1)}
                />
              </div>
              <span className="food-detailll__container-money text-[#626576]">
                {t("foodDetail.container.price")}
              </span>
            </div>
            <div className="food-detailll__ingridients">
              <h4 className="detailll__ingridients-title text-[#090A0B]">
                {t("foodDetail.ingredients.structure")}
              </h4>
              <ul className="detailll__ingridients-list text-[#090A0B]">
                <li>
                  <p className="text-[#090A0B]">
                    Лепешка тортилья — мягкая, слегка обжаренная, с золотистой
                    корочкой.
                  </p>
                </li>
                <li>
                  <p className="text-[#090A0B]">
                    Куриное филе в острой панировке — хрустящее снаружи, сочное
                    внутри, с пикантными специями.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetail;
