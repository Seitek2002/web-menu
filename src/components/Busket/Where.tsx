import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import checkbox from "../../assets/icons/Busket/checkbox.svg";

const Where: React.FC = () => {
    const { t, i18n } = useTranslation();
    const list = useMemo(() => [
        t("busket.where.takeaway"),
        t("busket.where.dinein")
    ], [i18n.language]); 

    const [active, setActive] = useState(list[1]);

    useEffect(() => {
        setActive(list[1]);
    }, [list]);

    return (
        <div className="busket-where">
            {list.map((item, index) => (
                <div
                    key={index}
                    onClick={() => setActive(item)}
                    className={`busket-where-wrapper bg-[#fff] border-[#e1e2e5] ${
                        active === item ? "active border-[#875AFF]" : ""
                    }`}
                >
                    {active === item ? (
                        <img src={checkbox} alt="check" />
                    ) : (
                        <div className="busket-where-checkbox border-[#e1e2e5]"></div>
                    )}
                    {item}
                </div>
            ))}
        </div>
    );
};

export default Where;
