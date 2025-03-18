import { FC, useState } from "react";
import ContentLoader from "react-content-loader";
import { IProductCatalog } from "src/types/products.types";
import { useAppSelector } from "src/hooks/useAppSelector";
import { useCartActions } from "src/hooks/useCartActions";

import whitePlus from "../../assets/icons/cart/plus.svg";
import whiteMinus from "../../assets/icons/cart/minus.svg";

import "./style.scss";

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
  productDescription,
  modificators,
  quantity,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const colorTheme = useAppSelector(state => state.yourFeature.venue?.colorTheme);
  const { handleClick, handleUnClick } = useCartActions({
    id,
    productName,
    productPrice,
    productPhoto,
    weight,
    category,
    productDescription,
    modificators,
    setIsShow,
    quantity
  });

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
            style={{ padding: "4px" }}
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
        <span className="cart-price" style={{ color: colorTheme }}>
          {+productPrice} с
        </span>
      </div>
      <h4 className="cart-name">{productName}</h4>
      {quantity === 0 ? (
        <button className="cart-btn bg-[#F1F2F3] text-[#000]" onClick={handleClick}>
          Добавить
        </button>
      ) : (
        <div className="cart-btn active" style={{ backgroundColor: colorTheme }}>
          <img onClick={handleUnClick} src={whiteMinus} alt="minus" />
          <span className="cart-count text-[#fff]">{quantity}</span>
          <img onClick={handleClick} src={whitePlus} alt="plus" />
        </div>
      )}
    </div>
  );
};

export default CatalogCard;
