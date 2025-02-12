import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import back from "../../assets/icons/Busket/back.svg";
import delet from "../../assets/icons/Busket/delete.svg";

type HeadProps = {
    renameTitleHead: () => void;
};

const Head: React.FC<HeadProps> = ({ renameTitleHead }) => { 
    const { t } = useTranslation();

    return (
        <>
            <div className="busket-top">
                <Link to="/" className="busket-wrapper-img bg-[#FFF]">
                    <img src={back} alt="back" />
                </Link>
                <h1 className="busket-title">{t("busket.busketTitle")}</h1>
                <div className="busket-wrapper-img bg-[#FFF]" onClick={renameTitleHead}>
                    <img src={delet} alt="delete" />
                </div>
            </div>
            <div className="busket-table bg-[#FFF]">{t("table")}</div>
        </>
    );
};

export default Head;
