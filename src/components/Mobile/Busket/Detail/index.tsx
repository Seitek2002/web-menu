import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./style.scss"


const ForgotCart: React.FC = () => {
    const [value, setValue] = useState("");
    const formatPhoneNumber = (input: string) => {
        const digits = input.replace(/\D/g, "");

        const maxDigits = 12;
        const limitedDigits = digits.slice(0, maxDigits);

        let formatted = "+996";
        if (limitedDigits.length > 3) {
            formatted += ` (${limitedDigits.slice(3, 6)}`;
        }
        if (limitedDigits.length > 6) {
            formatted += `) ${limitedDigits.slice(6, 9)}`;
        }
        if (limitedDigits.length > 9) {
            formatted += `-${limitedDigits.slice(9, 12)}`;
        }
        const handleClick = () => {
            if (navigator.vibrate) {
              navigator.vibrate(50);
            }
          };
        return formatted;
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const formattedInput = formatPhoneNumber(input);
        setValue(formattedInput);
    };
    const { t } = useTranslation();

    return (
        <>
            <div className="busket__detail bg-white">
                <div className="busket__detail-top">
                    <h4 className="busket__detail-name">{t("busket.detail")}</h4>
                    <h4 className="busket__detail-required text-[#875AFF]">{t("foodDetail.ingredients.necessarily")}</h4>
                </div>
                <input className="busket__detail-input first" id="phone" type="text" value={value} onChange={handleInputChange} maxLength={18} placeholder="+996 700 000 000"/>
                <input type="text" className="busket__detail-input placeholder:text-[#80868B]" placeholder={t("busket.comment")}/>
            </div>
        </>
    );
};

export default ForgotCart;
