import { FC, useState } from "react";
import { addItem, removeItem } from "../../store/yourFeatureSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import plus from "../../assets/icons/Busket/plus.svg";
import minus from "../../assets/icons/Busket/minus.svg";
<<<<<<< HEAD

import "../../pages/Busket/style.scss";
=======
>>>>>>> ec28a72e8afd1218066e4aa67301621697e1da1e

interface IProps {
    id: string;
    name: string;
    weight: number;
    price: number;
    img: string;
    discount?: number;
    promotion?: boolean;
}

const Item: FC<IProps> = ({
    name,
    weight,
    price,
    img,
    discount,
    promotion,
    id,
}) => {
    const [count, setCount] = useState<number>(0);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        setCount(count + 1);
        dispatch(
            addItem({
                id,
                name,
                weight,
                price,
                img,
                discount,
                promotion,
                quantity: 1,
            })
        );
    };
    const handleUnClick = () => {
        setCount(count - 1);
        dispatch(
            removeItem({
                id,
                name,
                weight,
                price,
                img,
                discount,
                promotion,
                quantity: 0,
            })
        );
    };

    return (
        <>
            <div key={id} className="c-item ">
                <img src={img} alt="img" />
                <div className="c-inner">
                    <p className="c-name">{name}</p>
                    <div className="c-info">
                        <span className="c-price">{price} c</span>
                        <span className="c-g">•{weight}</span>
                    </div>
                </div>
                <button className="c-btn">
                    <img src={minus} alt="minus" onClick={handleUnClick} />
                    0
                    <img src={plus} alt="plus" onClick={handleClick} />
                </button>
            </div>
        </>
    );
};

export default Item;
