import { Link } from "react-router-dom";

import back from "../../assets/icons/Busket/back.svg";
import delet from "../../assets/icons/Busket/delete.svg";

type HeadProps = {
    renameTitleHead: () => void;
};

const Head: React.FC<HeadProps> = ({renameTitleHead}) => { 
    return (
        <>
            <div className="busket-top">
                <Link to="/" className="busket-wrapper-img bg-[#FFF]">
                    <img src={back} alt="back" />
                </Link>
                <h1 className="busket-title">Корзина</h1>
                <div className="busket-wrapper-img bg-[#FFF]" onClick={renameTitleHead}>
                    <img src={delet} alt="delete" />
                </div>
            </div>
            <div className="busket-table bg-[#FFF]">Стол №12</div>
        </>
    );
};

export default Head;
