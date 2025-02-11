import { FC, ReactNode } from "react";

type ModalProps = {
    title: string;
    children: ReactNode;
    onClose: () => void;
};

const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
    return (
        <>
            <div className="busket-modal"> 
                <div onClick={onClose} className="busket-modal-bg bg-[#A9AAAB]"></div>
                <div className="container">
                    <div className="busket-modal-wrapper bg-[#fff]">
                        <h2 className="busket-modal-title text-[#090A0B]">
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
