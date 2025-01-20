import { FC, useState } from "react";
// import { addItem, removeItem } from "../../store/yourFeatureSlice";
// import { useAppDispatch } from "../../hooks/useAppDispatch";

import plus from "../../assets/icons/Busket/plus.svg";
import minus from "../../assets/icons/Busket/minus.svg";

import "../../pages/Busket/style.scss";

interface IProps {
    id: string;
    name: string;
    weight: number;
    price: number;
    img: string;
    discount?: number;
    promotion?: boolean;
    length?: boolean;
}

const Item: FC<IProps> = ({
    name,
    weight,
    price,
    img,
    length,
}) => {
    const [count, setCount] = useState<number>(0);

    const handleClick = () => {
        setCount(count + 1);
        console.log(length);
        
    };

    const handleUnClick = () => {
        if (count) {
            setCount(count - 1);
        } 
    };

    return (
        <>
            <div className="c-item ">
               <div className="c-loy">
                {
                    length  ?  (
                        <>
                        <img className="c-img" src={img} alt="img" />
                        <div className="c-inner">
                            <p className="c-name">{name}</p>
                            <div className="c-info">
                                <span className="c-price">{price} c</span>
                                <span className="c-g">•{weight}</span>
                            </div>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className="c-inner">
                            <p className="c-name">{name}</p>
                            <div className="c-info">
                                <span className="c-price">{price} c</span>
                                <span className="c-g">•{weight}</span>
                            </div>
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
