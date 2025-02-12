import added from "../../../assets/icons/Busket/added.svg";
import adding from "../../../assets/icons/Busket/adding.svg";

interface ForgotCartProps {
    id: string;
    name: string;
    weight: number;
    price: number;
    img: string;
    discount: number;
    promotion: boolean;
}

const ForgotCart: React.FC<ForgotCartProps> = ({ name, weight, price, img, promotion }) => {
    return (
        <>
            <div className="busket-forgot-cart bg-[#fff]">
                <div className="busket-forgot-inner">
                    {promotion ? (
                        <div className="busket-forgot-added bg-[#875AFF]">
                            <img src={added} alt="✅" />
                        </div>
                    ) : (
                        <div className="busket-forgot-adding bg-[#F1F2F3]">
                            <img src={adding} alt="+" />
                        </div>
                    )}
                </div>
                <img src={img} className="busket-forgot-img" alt="img" />
                <div className="busket-forgot-info">
                    <span className="busket-forgot-price text-[#875AFF]">{price} с</span>
                    <span className="busket-forgot-weight text-[#ADADAD]">
                        •{weight}г
                    </span>
                </div>
                <p className="busket-forgot-name">{name}</p>
            </div>
        </>
    );
};

export default ForgotCart;
