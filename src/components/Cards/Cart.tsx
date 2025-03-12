import { FC } from "react";
import { IProductCatalog } from "src/types/products.types";
import { useAppSelector } from "src/hooks/useAppSelector";
import plus from "../../assets/icons/Busket/plus.svg";
import minus from "../../assets/icons/Busket/minus.svg";
import "./style.scss";
import { useCartActions } from "src/hooks/useCartActions";

type IProps = IProductCatalog & {
  quantity: number;
  cartLength: boolean;
};

const CardBusket: FC<IProps> = ({
  id,
  productName,
  weight,
  productPrice,
  productPhoto,
  category,
  modificators,
  productDescription,
  quantity,
  cartLength,
}) => {
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
    quantity
  });

  return (
    <div className="busket-item">
      <div className="busket-loy">
        {cartLength && <img className="busket-img" src={productPhoto} alt="img" />}
        <div className="busket-inner">
          <p className="busket-name">
            {productName}
            {!cartLength && (
              <>
                <span className="busket-cart-price" style={{ color: colorTheme }}>
                  {productPrice} c
                </span>
                <span className="busket-g text-[#ADADAD]">•{weight}</span>
              </>
            )}
          </p>
          {cartLength && (
            <div className="busket-info">
              <span className="busket-cart-price" style={{ color: colorTheme }}>
                {productPrice} c
              </span>
              <span className="busket-g text-[#ADADAD]">•{weight}</span>
            </div>
          )}
        </div>
      </div>
      <button className="busket-btn bg-[#F1F2F3]">
        <img src={minus} alt="minus" onClick={handleUnClick} />
        {quantity}
        <img src={plus} alt="plus" onClick={handleClick} />
      </button>
    </div>
  );
};

export default CardBusket;
