import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import back from "../../../assets/icons/Busket/back.svg";
import delet from "../../../assets/icons/Busket/delete.svg";

type HeadProps = {
    renameTitleHead: () => void;
};

const Head: React.FC<HeadProps> = ({ renameTitleHead }) => { 
    const { t } = useTranslation();

    return (
        <>
            <div className="busket__top">
                <Link to="/" className="busket__wrapper-img bg-[#FFF]">
                    <img src={back} alt="back" />
                </Link>
                <h1 className="busket__title">{t("busket.busketTitle")}</h1>
                <div className="busket__wrapper-img bg-[#FFF]" onClick={renameTitleHead}>
                    <img src={delet} alt="delete" />
                </div>
            </div>
        </>
    );
};

export default Head;
