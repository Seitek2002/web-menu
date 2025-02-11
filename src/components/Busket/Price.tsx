import { useState } from "react";
import priceArrow from "../../assets/icons/Busket/priceArrow.svg";

const Price: React.FC = () => {

    const [active, setActive] = useState(false)

    return (
        <>
            <div className="busket-price bg-[#fff]">
                <div onClick={() => setActive(!active)} className="busket-price-top text-[#80868B]">
                    Детали суммы
                    <img src={priceArrow} alt="arrow" className={active ? "busket-price-img active" : "busket-price-img"} />
                </div>
                <div className={active ? "busket-price-wrapper divide-y active" : "busket-price-wrapper divide-y"}>
                    <div className="busket-price-item text-[#80868B]">
                        Общая стоимость
                        <div className="busket-price-total all text-[#80868B]">1350 с</div>
                    </div>
                    <div className="busket-price-item text-[#80868B]">
                        Скидка
                        <div className="busket-price-total discount text-[#f80101]">-23 с</div>
                    </div>
                    <div className="busket-price-item text-[#80868B]">
                        Бонусы
                        <div className="busket-price-total bonus text-[#11af22]">+99 б</div>
                    </div>
                    <div className="busket-price-item text-[#80868B]">
                        Обслуживание
                        <div className="busket-price-total service">230 с</div>
                    </div>
                </div>
                <div className="busket-price-ress border-[#f3f3f3]">
                    Итоговая сумма <span>1200 с</span>
                </div>
            </div>
        </>
    );
};

export default Price;
