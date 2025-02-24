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
    const [selectedSize, setSelectedSize] = useState("Маленький");

    const handleCounterChange = (delta: number) => {
        setCounter((prev) => Math.max(1, prev + delta));
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

    const bind = useGesture({
        onDrag: ({ movement: [, y], down }) => {
            if (!down && y > 100) {
                setIsShow(); // Закрываем компонент при свайпе вниз
            }
        },
    });

    const { t } = useTranslation();

    return (
        // <div className={"food-detail bg-[#F1F2F3]" + (isShow ? " active" : "")}>
        //   <img src={close} alt="" className="close" onClick={setIsShow} />
        //   <div {...bind()} className="img-wrapper">
        //     <img src={item?.productPhoto} alt="" />
        //   </div>
        //   <div className="food-detailll__content">
        //     <div className="description">
        //       <h2 className="text-[#090A0B]">{item?.productName}</h2>
        //       <p className="text-[#090A0B]">
        //         Кофейный напиток с добавлением молока
        //       </p>
        //     </div>
        //     <div className="ingridients">
        //       <h2 className="text-[#090A0B]">
        //         {t("foodDetail.ingredients.structure")}
        //       </h2>
        //       <ul className="text-[#090A0B]">
        //         <li>
        //           <p className="text-[#090A0B]">
        //             Лепешка тортилья — мягкая, слегка обжаренная, с золотистой
        //             корочкой.
        //           </p>
        //         </li>
        //         <li>
        //           <p className="text-[#090A0B]">
        //             Куриное филе в острой панировке — хрустящее снаружи, сочное
        //             внутри, с пикантными специями.
        //           </p>
        //         </li>
        //       </ul>
        //     </div>
        //     <div className="sugar__block flex items-center justify-between">
        //       <h2 className="text-[#090A0B]">
        //         {t("foodDetail.ingredients.sugar.question")}
        //       </h2>
        //       <div className="required text-[#875AFF]">
        //         {t("foodDetail.ingredients.necessarily")}
        //       </div>
        //     </div>
        //     <div className="sugar bg-[#fff]">
        //       <div className="flex items-center justify-between"></div>
        //       <div className="sugar__content">
        //         <div className="sugar__item">
        //           <label className="checkbox">
        //             <input
        //               type="radio"
        //               checked={sugar === "with" ? true : false}
        //               value={sugar}
        //               onChange={() => setSugar("with")}
        //             />
        //             <span>
        //               {t("foodDetail.ingredients.sugar.options.with_sugar")}
        //             </span>
        //           </label>
        //           <div className="price text-[#626576]">
        //             {t("foodDetail.ingredients.sugar.options.price")}
        //           </div>
        //         </div>
        //         <hr className="my-[8px]" />
        //         <div className="sugar__item">
        //           <label className="checkbox">
        //             <input
        //               type="radio"
        //               checked={sugar === "without" ? true : false}
        //               value={sugar}
        //               onChange={() => setSugar("without")}
        //             />
        //             <span>
        //               {t("foodDetail.ingredients.sugar.options.without_sugar")}
        //             </span>
        //           </label>
        //           <div className="price text-[#626576]">
        //             {t("foodDetail.ingredients.sugar.options.free")}
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="size">
        //       <div className="flex items-center justify-between">
        //         <h2 className="text-[#090A0B]">{t("size.sizeChoose")}</h2>
        //         <div className="required text-[#875AFF]">
        //           {t("foodDetail.ingredients.necessarily")}
        //         </div>
        //       </div>
        //       <div className="size__content">
        //         {sizes.map((sizeKey, index) => (
        //           <div
        //             key={index}
        //             className={`size__item bg-white ${
        //               selectedSize === sizeKey ? "active border-[#875AFF]" : ""
        //             }`}
        //             onClick={() => setSelectedSize(sizeKey)}
        //           >
        //             <span>{t(`size.${sizeKey}`)}</span>
        //             <div className="price text-[#626576]">
        //               {t(`size.price.${sizeKey}`)}
        //             </div>
        //           </div>
        //         ))}
        //       </div>
        //     </div>
        //     <div className="case">
        //       <div className="flex gap-[12px]">
        //         {containerAdd ? (
        //           <div className="flex gap-[12px]">
        //             <img
        //               src={minus}
        //               alt=""
        //               onClick={() => setContainerAdd(containerAdd - 1)}
        //             />
        //             {containerAdd}
        //             <img
        //               src={plus}
        //               alt=""
        //               onClick={() => setContainerAdd(containerAdd + 1)}
        //             />
        //           </div>
        //         ) : (
        //           <img
        //             src={addContainer}
        //             alt=""
        //             onClick={() => setContainerAdd(1)}
        //           />
        //         )}
        //         <span>{t("container.container")}</span>
        //       </div>
        //       <div className="price text-[#626576]">{t("container.price")}</div>
        //     </div>
        //   </div>
        //   <footer className="counter bg-[#fff]">
        //     <div className="counter__left bg-[#F1F2F3]">
        //       <svg
        //         onClick={() => handleCounterChange(-1)}
        //         width="24"
        //         height="24"
        //         viewBox="0 0 24 24"
        //         fill="none"
        //         xmlns="http://www.w3.org/2000/svg"
        //       >
        //         <path
        //           d="M3.75 12H20.25"
        //           stroke="black"
        //           strokeWidth="1.5"
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //         />
        //       </svg>
        //       <span
        //         style={{ margin: "0 12px", fontSize: "16px", fontWeight: "bold" }}
        //       >
        //         {counter}
        //       </span>
        //       <svg
        //         onClick={() => handleCounterChange(1)}
        //         width="24"
        //         height="24"
        //         viewBox="0 0 24 24"
        //         fill="none"
        //         xmlns="http://www.w3.org/2000/svg"
        //       >
        //         <path
        //           d="M3.75 12H20.25"
        //           stroke="black"
        //           strokeWidth="1.5"
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //         />
        //         <path
        //           d="M12 3.75V20.25"
        //           stroke="black"
        //           strokeWidth="1.5"
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //         />
        //       </svg>
        //     </div>
        //     <div className="counter__right bg-[#875AFF] text-[#fff]">
        //       <button onClick={handleDone}>{t("counter")}</button>
        //     </div>
        //   </footer>
        // </div>
        <>
            <div className={"food-detailll" + (isShow ? " active" : "")}>
                <div className="food-detailll__bg bg-[#000]"></div>
                <div className="food-detailll__wrapper bg-[#fff]">
                    <img src={close} alt="close" className="food-detailll__close" />
                    <img src={item?.productPhoto} alt="img" className="food-detailll__img" />
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
                            {item?.productDescription} Кофейный напиток с добавлением молока и двух шотов эспрессо, так же можно добавить сахарили сироп
                        </p>
                        <div className="food-detailll__btns">
                            <div className="food-detailll__quantity-btn bg-[#F1F2F3] text-[#090A0B]">
                                <img src={minus} alt="minus" /> {containerAdd}
                                <img src={plus} alt="plus" />
                            </div>
                            <button className="food-detailll__add-btn text-[#fff] bg-[#875AFF]">
                                Добавить
                            </button>
                        </div>
                        {/* <div className="food-detailll__suga-title">
                          <h4 className="food-detailll__suga-quastion">С сахаром или без?</h4>
                          <h4 className="food-detailll__suga-required">Обязательно*</h4>
                          </div>
                          <div className="food-detailll__suga-btn">C cахаром <span>+10 с</span></div>
                          <div className="food-detailll__suga-btn">Без cахара <span>Бесплатно</span>
                        </div> */}

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
                                <div key={index} className={`food-detailll__size-item bg-[#F1F2F3] ${ selectedSize === sizeKey ? "active border border-[#875AFF] bg-[#fff]" : "" }`} onClick={() => setSelectedSize(sizeKey)} >
                                    <span className="food-detailll__size-title text-[#090A0B]">{t(`size.${sizeKey}`)}</span>
                                    <div className="food-detailll__size-price text-[#626576]">
                                        {t(`size.price.${sizeKey}`)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="food-detailll__container">
                            <div className="food-detailll__container-btn">
                                <img src={minus} alt="minus" /> 
                                0
                                <img src={plus} alt="plus" />
                                {t("foodDetail.container.container")}
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
                                        Лепешка тортилья — мягкая, слегка
                                        обжаренная, с золотистой корочкой.
                                    </p>
                                </li>
                                <li>
                                    <p className="text-[#090A0B]">
                                        Куриное филе в острой панировке —
                                        хрустящее снаружи, сочное внутри, с
                                        пикантными специями.
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
