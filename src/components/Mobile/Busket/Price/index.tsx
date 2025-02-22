import { useState } from "react";
import priceArrow from "../../../../assets/icons/Busket/priceArrow.svg";

import "./style.scss"

const Price: React.FC = () => {

    const [active, setActive] = useState(false)

    return (
        <>
            <div className="busket__sum bg-[#fff]">
                <div onClick={() => setActive(!active)} className="busket__sum-top text-[#80868B]">
                    Детали суммы
                    <img src={priceArrow} alt="arrow" className={active ? "busket__sum-img active" : "busket__sum-img"} />
                </div>
                <div className={active ? "busket__sum-wrapper divide-y active" : "busket__sum-wrapper divide-y"}>
                    <div className="busket__sum-item text-[#80868B]">
                        Общая стоимость
                        <div className="busket__sum-total all text-[#80868B]">1350 с</div>
                    </div>
                    <div className="busket__sum-item text-[#80868B]">
                        Скидка
                        <div className="busket__sum-total discount text-[#f80101]">-23 с</div>
                    </div>
                    <div className="busket__sum-item text-[#80868B]">
                        Бонусы
                        <div className="busket__sum-total bonus text-[#11af22]">+99 б</div>
                    </div>
                    <div className="busket__sum-item text-[#80868B]">
                        Обслуживание
                        <div className="busket__sum-total service">230 с</div>
                    </div>
                </div>
                <div className="busket__sum-ress border-[#f3f3f3]">
                    Итоговая сумма <span>1200 с</span>
                </div>
            </div>
        </>
    );
};

export default Price;
