import { useState } from "react";
import { useTranslation } from "react-i18next";
import ava from "../../assets/icons/Busket/ava.svg";
import first from "../../assets/icons/Busket/first.svg";

const Tips: React.FC = () => {
    const list = ["", "50 c", "100 c", "15 %", "20 %"]
    const [active, setActive] = useState(0)
    const { t, i18n } = useTranslation();

    return (
        <>
            <div className="busket-tips bg-[#fff]">
                <h3 className="busket-tips-title">{t("busket.tips")}</h3>
                <div className="busket-tips-info">
                    <div className="busket-tips-ava">
                        <img src={ava} alt="ava" />
                    </div>
                    <div className="busket-tips-inner">
                        <span className="busket-tips-job text-[#626576]">{t("busket.job")}</span>
                        <span className="busket-tips-name">
                            Имнакулов Дамир
                        </span>
                    </div>
                </div>
                <div className="busket-tips-wrapper">
                    {
                        list.map((item, index) => (
                        <div key={index} onClick={() => setActive(index)} className={active === index ? "busket-tips-item active bg-[#875AFF] text-[#fff]" : "busket-tips-item bg-[#F9F9F9]"}>
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
