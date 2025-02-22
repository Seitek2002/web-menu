import { FC, useEffect, useState } from "react";

import back from "../../assets/icons/OrderStatus/back.svg";
import share from "../../assets/icons/OrderStatus/share.svg";

const Head: FC = () => {
    const [mobail, setMobail] = useState(window.innerWidth > 768);

    useEffect(() => {
        setMobail(window.innerWidth > 768);
    }, []);
    return (
        <div className="order__status-head">
            {
                mobail && ( <div className="order__status-img-wrapper bg-white"><img src={back} alt="back" /></div> )
            }
            
            <h2 className="order__status-title text-[#090A0B]">Мой заказ</h2>
            {
                mobail && ( <div className="order__status-img-wrapper bg-white"><img src={share} alt="back" /></div> )
            }
        </div>
    );
};

export default Head;
