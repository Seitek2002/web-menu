import { useState } from "react";
import { useTranslation } from "react-i18next";


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
            <div className="busket-detail bg-white">
                <div className="busket-detail-top">
                    <h4 className="busket-detail-name">{t("busket.detail")}</h4>
                    <h4 className="busket-detail-required text-[#875AFF]">{t("foodDetail.ingredients.necessarily")}</h4>
                </div>
                <input
                    className="busket-detail-input first"
                    id="phone"
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    maxLength={18}
                    placeholder="+996 700 000 000"
                />

                <input
                    type="text"
                    className="busket-detail-input placeholder:text-[#80868B]"
                    placeholder={t("busket.comment")}
                />
            </div>
        </>
    );
};

export default ForgotCart;
