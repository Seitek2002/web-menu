import { FC, useState } from "react";
// import { addItem, removeItem } from "../../store/yourFeatureSlice";
// import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addItem, removeItem } from '../../store/yourFeatureSlice';

import plus from "../../assets/icons/Busket/plus.svg";
import minus from "../../assets/icons/Busket/minus.svg";

import "../../pages/Busket/style.scss";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { IProductCatalog } from "src/types/products.types";

type IProps = IProductCatalog & { 
    quantity: number;
    cartLength: boolean; // Добавляем это сюда
  };

const Item: FC<IProps> = ({
    id,
    productName,
    weight,
    productPrice,
    productPhoto,
    category,
    modificators,
    quantity,
    cartLength
}) => {
    const [count, setCount] = useState<number>(quantity);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        setCount(count + 1); 
        dispatch(
          addItem({
            id,
            productName,
            productPrice,
            productPhoto,
            weight,
            category,
            quantity: 1,
            modificators
          })
        );
      };
    
      const handleUnClick = () => {
        
        if (count) {
            setCount(count - 1);
        } 
        dispatch(
          removeItem({
            id,
            productName,
            productPrice,
            weight,
            productPhoto,
            category,
            quantity: 0,
            modificators
          })
        );
      };
    

   

    return (
        <>
            <div className="busket-item ">
               <div className="busket-loy">
                {
                    cartLength  ?  (
                        <>
                        <img className="busket-img" src={productPhoto} alt="img" />
                        <div className="busket-inner">
                            <p className="busket-name">{productName}</p>
                            <div className="busket-info">
                                <span className="busket-cart-price">{productPrice} c</span>
                                <span className="busket-g">•{weight}</span>
                            </div>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className="busket-inner">
                            <p className="busket-name">{productName} <span className="busket-cart-price">{productPrice} c</span><span className="busket-g">•{weight}</span></p>
                        </div>
                        </>
                    )
                }
               </div>
                <button className="busket-btn">
                    <img src={minus} alt="minus" onClick={handleUnClick} />
                    {count}
                    <img src={plus} alt="plus" onClick={handleClick} />
                </button>
            </div>
        </>
    );
};

export default Item;
