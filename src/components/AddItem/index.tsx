import { useState } from "react";
import added from "../../assets/icons/Busket/added.svg";
import adding from "../../assets/icons/Busket/adding.svg";

import "./style.scss"

const AddItem: React.FC = () => {

    const [add, setAdd] = useState(false)
    
    return (
        <>
            <div className="chek__inner">
                {add ? (
                    <div onClick={() => setAdd(false)} className="chek__added bg-[#875AFF]">
                        <img src={added} alt="✅" />
                    </div>                                                                  
                ) : (
                    <div onClick={() => setAdd(true)} className="chek__adding bg-[#F1F2F3]">
                        <img src={adding} alt="+" />
                    </div>
                )}
            </div>
        </>
    );
};

export default AddItem;
