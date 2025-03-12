import { useState } from "react";
import added from "../../assets/icons/Busket/added.svg";
import adding from "../../assets/icons/Busket/adding.svg";
import { useAppSelector } from "src/hooks/useAppSelector";

import "./style.scss"

const AddItem: React.FC<{ setDalete: () => void; setAdded: () => void }> = ({ setDalete, setAdded }) => {
    const colorTheme = useAppSelector(state => state.yourFeature.venue?.colorTheme);
    
    const VibrationClick = () => {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    const [add, setAdd] = useState(false);

    return (
        <div className="chek__inner">
            {add ? (
                <div 
                    onClick={() => { setAdd(false); setDalete(); VibrationClick(); }} 
                    className="chek__added"
                    style={{ backgroundColor: colorTheme }}
                >
                    <img src={added} alt="✅" />
                </div>
            ) : (
                <div 
                    onClick={() => { setAdd(true); setAdded(); VibrationClick(); }} 
                    className="chek__adding"
                    style={{ backgroundColor: "#F1F2F3" }}
                >
                    <img src={adding} alt="+" />
                </div>
            )}
        </div>
    );
};

export default AddItem;
