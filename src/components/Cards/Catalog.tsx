import { FC, useState } from "react";
import { addItem, removeItem } from "../../store/yourFeatureSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import ContentLoader from "react-content-loader";
import { IProductCatalog } from "src/types/products.types";

import whitePlus from "../../assets/icons/cart/plus.svg";
import whiteMinus from "../../assets/icons/cart/minus.svg";

import "./style.scss";
const ScrollClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
interface IProps extends IProductCatalog {
  setIsShow: () => void;
  quantity: number;
}

const CatalogCard: FC<IProps> = ({
  id,
  productName,
  productPrice,
  productPhoto,
  category,
  weight,
  setIsShow,
  modificators,
  quantity,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (modificators && modificators.length > 0) {
      setIsShow();
    } else {
      dispatch(
        addItem({
          id,
          productName,
          productPrice,
          productPhoto,
          weight,
          category,
          quantity: 1,
          modificators: [],
        })
      );
    }
  };

  const handleUnClick = () => {
    dispatch(
      removeItem({
        id,
        productName,
        productPrice,
        weight,
        productPhoto,
        category,
        quantity: 0,
        modificators: [],
      })
    );
  };

  return (
    <div className="cart-block bg-white">
      <div className="cart-img">
        {!isLoaded && (
          <ContentLoader
            speed={1.5}
            width="100%"
            height="100%"
            backgroundColor="#bebebe"
            foregroundColor="#fff"
            style={{
              padding: "4px",
            }}
          >
            <rect className="skeleton-img" y="0" rx="12" ry="12" />
          </ContentLoader>
        )}
        <img
          src={productPhoto}
          alt="img"
          onLoad={() => setIsLoaded(true)}
          className={isLoaded ? "" : "hidden"}
          onClick={setIsShow}
        />
      </div>
      <div className="cart-info">
        <span className="cart-price text-[#875AFF]">{productPrice} с</span>
        {/* <span className="cart-weight text-[#ADADAD]">•{category.categoryName}</span> */}
      </div>
      <h4 className="cart-name">{productName}</h4>
      {quantity === 0 ? (
        <button
          className="cart-btn bg-[#F1F2F3] text-[#000]"
          onClick={() => {
            handleClick();
            ScrollClick();
          }}
        >
          Добавить
        </button>
      ) : (
        <div className="cart-btn active bg-[#875AFF]">
          <img onClick={handleUnClick} src={whiteMinus} alt="minus" />
          <span className="cart-count text-[#fff]">{quantity}</span>
          <img onClick={handleClick} src={whitePlus} alt="plus" />
        </div>
      )}
    </div>
  );
};

export default CatalogCard;
