import { FC, ReactNode } from "react";

import "./style.scss"

type ModalProps = {
    title: string;
    children: ReactNode;
    onClose: () => void;
};
const VibrationClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
    return (
        <>
            <div className="busket__modal"> 
                <div onClick={() => {onClose(), VibrationClick()}} className="busket__modal-bg bg-[#A9AAAB]"></div>
                <div className="container">
                    <div className="busket__modal-wrapper bg-[#fff]">
                        <h2 className="busket__modal-title text-[#090A0B]"
                            onClick={() => {VibrationClick()}}
                        >
                            {title}
                        </h2>
                        <div onClick={() => {VibrationClick()}}>
                        {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
