import AddItem from "src/components/AddItem";

import "./style.scss"

interface ForgotCartProps {
    id: string;
    name: string;
    weight: number;
    price: number;
    img: string;
    discount: number;
}

const Forgot: React.FC<ForgotCartProps> = ({ name, weight, price, img,  }) => {
    return (
        <>
            <div className="busket__forgot-cart bg-[#fff]">
                <div className="busket__forgot-inner">
                  <AddItem />
                </div>
                <img src={img} className="busket__forgot-img" alt="img" />
                <div className="busket__forgot-info">
                    <span className="busket__forgot-price text-[#875AFF]">{price} с</span>
                    <span className="busket__forgot-weight text-[#ADADAD]">
                        •{weight}г
                    </span>
                </div>
                <p className="busket__forgot-name">{name}</p>
            </div>
        </>
    );
};

export default Forgot;
