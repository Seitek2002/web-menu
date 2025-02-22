import { useEffect, useState } from "react";
import circle from "../../../assets/icons/Check/circle.svg";
import close from "../../../assets/icons/Check/close.svg";
import share from "../../../assets/icons/Check/share.svg";

import "./style.scss";

const Check: React.FC = () => {

  const [mobail, setMobail] = useState(window.innerWidth <= 769);


  useEffect(() => {
    setMobail(window.innerWidth > 600);
  }, []);

    return (
        <div className="check">
            <div className="check-bg bg-[#000]"></div>
                <div className="check-block bg-[#fff]">
                  {
                    mobail ? ( <button className="check-close"><img src={close} alt="close" /></button> ) :
                    (
                      <div className="check-head">
                        <button className="check-cancle text-[#000000]">отмена</button>
                        <button><img src={share} alt="close" /></button>
                      </div>
                    )
                  }
                    <img src={circle} alt="green-circle" className="check-circle"/>
                    <h2 className="check-title text-[#11AF22]"> Транзакция успешно проведена</h2>
                    <p className="check-sum text-[#282828]">+3.000 С</p>

                    <ul className="check-wrapper">
                        <li className="check-item">
                            <span className="check-left text-[#5F6980]">Плательщик</span>
                            <span className="check-right text-[#282828]">Аман Н.</span>
                        </li>
                        <li className="check-item">
                            <span className="check-left text-[#5F6980]">Имя получателя</span>
                            <span className="check-right text-[#282828]">
                                Кофейня "Утречкоф"
                            </span>
                        </li>
                        <li className="check-item">
                            <span className="check-left text-[#5F6980]">
                                Оплачено со счета
                            </span>
                            <span className="check-right text-[#282828]">103012530209409</span>
                        </li>
                        <li className="check-item">
                            <span className="check-left text-[#5F6980]">Комиссия</span>
                            <span className="check-right text-[#282828]">0.50 с</span>
                        </li>
                        <li className="check-item">
                            <span className="check-left text-[#5F6980]">Дата операции</span>
                            <span className="check-right text-[#282828]">
                                30.12.2024, 17:40
                            </span>
                        </li>
                        <li className="check-item">
                            <span className="check-left text-[#5F6980]">Номер квитанции</span>
                            <span className="check-right text-[#282828]">P01e91903439r39</span>
                        </li>
                    </ul>
                    {mobail && <button className="check-share bg-[#F1F2F3] text-[#090A0B]"> <img src={share} alt="" /> Поделиться </button>}
                    
                </div>
        </div>
    );
};

export default Check;
