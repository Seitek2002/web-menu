import { useState } from "react";
import checkbox from "../../assets/icons/Busket/checkbox.svg";

const where: React.FC = () => {
    const list = ["С собой", "В заведении"];
    const [active, setActive] = useState("В заведении");
    return (
        <>
            <div className="busket-where">
                {list.map((item) => (
                    <div key={item} onClick={() => setActive(item)} className="busket-where-wrapper">
                        {active == item ? (
                            <img src={checkbox} alt="check" />
                        ) : (
                            <div className="busket-where-checkbox"></div>
                        )} {item}
                    </div>
                ))}

                {/* <div className="busket-where-wrapper">
                    <img src={checkbox} alt="check" /> В заведении
                </div> */}
            </div>
        </>
    );
};

export default where;
