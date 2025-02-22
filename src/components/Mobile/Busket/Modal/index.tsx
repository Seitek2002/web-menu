import { FC, ReactNode } from "react";

import "./style.scss"

type ModalProps = {
    title: string;
    children: ReactNode;
    onClose: () => void;
};

const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
    return (
        <>
            <div className="busket__modal"> 
                <div onClick={onClose} className="busket__modal-bg bg-[#A9AAAB]"></div>
                <div className="container">
                    <div className="busket__modal-wrapper bg-[#fff]">
                        <h2 className="busket__modal-title text-[#090A0B]">
                            {title}
                        </h2>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
