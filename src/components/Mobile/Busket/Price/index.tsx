import { useState } from "react";
import priceArrow from "../../../../assets/icons/Busket/priceArrow.svg";
import { useAppSelector } from '../../../../hooks/useAppSelector';

import "./style.scss"

interface TipsProps {
    tips: string;
}

const Price: React.FC<TipsProps> = ({ tips }) => {
    const cart = useAppSelector(state => state.yourFeature.items);
    const [active, setActive] = useState(false);


    const totalPrice = cart.reduce((acc, item) => acc + +item.productPrice * item.quantity, 0);

    const calculateTips = () => {
        if (!tips) return 0; 

        if (tips.includes("%")) {
            const percent = parseFloat(tips);
            return (totalPrice * percent) / 100;
        } else {
            return parseFloat(tips);
        }
    };
    
    const service = Math.round(totalPrice / 100);
    const finalService = Math.round(service * 15);
    const finalPrice = Math.round(totalPrice + calculateTips());


    return (
        <div className="busket__sum bg-[#fff]">
            <div onClick={() => setActive(!active)} className="busket__sum-top text-[#80868B]">
                Детали суммы
                <img src={priceArrow} alt="arrow" className={active ? "busket__sum-img active" : "busket__sum-img"} />
            </div>
            <div className={active ? "busket__sum-wrapper divide-y active" : "busket__sum-wrapper divide-y"}>
                <div className="busket__sum-item text-[#80868B]">
                    Общая стоимость
                    <div className="busket__sum-total all text-[#80868B]">{totalPrice} с</div>
                </div>

                <div className="busket__sum-item text-[#80868B]">
                    Бонусы
                    <div className="busket__sum-total bonus text-[#11af22]">+99 б</div>
                </div>
                <div className="busket__sum-item text-[#80868B]">
                    Обслуживание
                    <div className="busket__sum-total service">{finalService} с</div>
                </div>
                <div className="busket__sum-item text-[#80868B]">
                    Чаевые
                    <div className="busket__sum-total tips">{Math.round(calculateTips())} с</div>
                </div>
            </div>
            <div className="busket__sum-ress border-[#f3f3f3]">
                Итоговая сумма <span>{finalPrice} с</span>
            </div>
        </div>
    );
};

export default Price;
