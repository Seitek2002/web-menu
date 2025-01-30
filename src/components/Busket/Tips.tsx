import { useState } from "react";
import ava from "../../assets/icons/Busket/ava.svg";
import first from "../../assets/icons/Busket/first.svg";

const Tips: React.FC = () => {
    const list = ["", "50 c", "100 c", "15 %", "20 %"]
    const [active, setActive] = useState(0)

    return (
        <>
            <div className="busket-tips">
                <h3 className="busket-tips-title">Чаевые</h3>
                <div className="busket-tips-info">
                    <div className="busket-tips-ava">
                        <img src={ava} alt="ava" />
                    </div>
                    <div className="busket-tips-inner">
                        <span className="busket-tips-job">Официант</span>
                        <span className="busket-tips-name">
                            Имнакулов Дамир
                        </span>
                    </div>
                </div>
                <div className="busket-tips-wrapper">
                    {
                        list.map((item, index) => (
                        <div key={index} onClick={() => setActive(index)} className={active === index ? "busket-tips-item active" : "busket-tips-item"}>
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
