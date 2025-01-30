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
                <div onClick={onClose} className="busket-modal-bg"></div>
                <div className="container">
                    <div className="busket-modal-wrapper">
                        <h2 className="busket-modal-title">
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
