import { useState } from "react";
import { useTranslation } from "react-i18next";
import ava from "../../../../assets/icons/Busket/ava.svg";
import first from "../../../../assets/icons/Busket/first.svg";

import "./style.scss"

const Tips: React.FC = () => {
    const list = ["", "50 c", "100 c", "15 %", "20 %"]
    const [active, setActive] = useState(0)
    const { t } = useTranslation();
    const VibrationClick = () => {
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      };
    return (
        <>
            <div className="busket__server bg-[#fff]">
                <h3 className="busket__server-title">{t("busket.tips")}</h3>
                <div className="busket__server-info">
                    <div className="busket__server-ava">
                        <img src={ava} alt="ava" />
                    </div>
                    <div className="busket__server-inner">
                        <span className="busket__server-job text-[#626576]">{t("busket.job")}</span>
                        <span className="busket__server-name">
                            Имнакулов Дамир
                        </span>
                    </div>
                </div>
                <div className="busket__server-wrapper">
                    {
                        list.map((item, index) => (
                        <div key={index} onClick={() => {setActive(index), VibrationClick()}} className={active === index ? "busket__server-item active bg-[#875AFF] text-[#fff]" : "busket__server-item bg-[#F9F9F9]"}>
                            {
                                item ? (
                                    item
                                ) : (
                                    <img src={first} alt="icon" />
                                )
                            }
                        </div>
                        ))
                    }
                    
                </div>
            </div>
        </>
    );
};

export default Tips;
