import { FC, useState } from "react";
// import { addItem, removeItem } from "../../store/yourFeatureSlice";
// import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addItem, removeItem } from '../../store/yourFeatureSlice';

import plus from "../../assets/icons/Busket/plus.svg";
import minus from "../../assets/icons/Busket/minus.svg";

import "../../pages/Busket/style.scss";
import { useAppDispatch } from "src/hooks/useAppDispatch";

interface IProps {
    id:number;
    productName: string;
    weight: number;
    productPrice: string;
    productPhoto: string;
    discount?: number;
    promotion?: boolean;
    length?: boolean;
    quantity:number;
    category: {
        id: number;
        categoryName: string;
      };
}

const Item: FC<IProps> = ({
    id,
    productName,
    weight,
    productPrice,
    productPhoto,
    length,
    quantity,
    category,
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
          })
        );
      };
    

   

    return (
        <>
            <div className="c-item ">
               <div className="c-loy">
                {
                    length  ?  (
                        <>
                        <img className="c-img" src={productPhoto} alt="img" />
                        <div className="c-inner">
                            <p className="c-name">{productName}</p>
                            <div className="c-info">
                                <span className="c-cart-price">{productPrice} c</span>
                                <span className="c-g">•{weight}</span>
                            </div>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className="c-inner">
                            <p className="c-name">{productName} <span className="c-cart-price">{productPrice} c</span><span className="c-g">•{weight}</span></p>
                        </div>
                        </>
                    )
                }
               </div>
                <button className="c-btn">
                    <img src={minus} alt="minus" onClick={handleUnClick} />
                    {count}
                    <img src={plus} alt="plus" onClick={handleClick} />
                </button>
            </div>
        </>
    );
};

export default Item;
