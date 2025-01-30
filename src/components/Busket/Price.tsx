import { useState } from "react";
import priceArrow from "../../assets/icons/Busket/priceArrow.svg";

const Price: React.FC = () => {

    const [active, setActive] = useState(false)

    return (
        <>
            <div className="busket-price">
                <div onClick={() => setActive(!active)} className="busket-price-top">
                    Детали суммы
                    <img src={priceArrow} alt="arrow" className={active ? "busket-price-img active" : "busket-price-img"} />
                </div>
                <div className={active ? "busket-price-wrapper divide-y active" : "busket-price-wrapper divide-y"}>
                    <div className="busket-price-item">
                        Общая стоимость
                        <div className="busket-price-total all">1350 с</div>
                    </div>
                    <div className="busket-price-item">
                        Скидка
                        <div className="busket-price-total discount">-23 с</div>
                    </div>
                    <div className="busket-price-item">
                        Бонусы
                        <div className="busket-price-total bonus">+99 б</div>
                    </div>
                    <div className="busket-price-item">
                        Обслуживание
                        <div className="busket-price-total service">230 с</div>
                    </div>
                </div>
                <div className="busket-price-ress">
                    Итоговая сумма <span>1200 с</span>
                </div>
            </div>
        </>
    );
};

export default Price;
