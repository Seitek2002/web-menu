import AddItem from "../../../AddItem";

import "./style.scss"

interface ForgotCartProps {
    id: number;
    name: string;
    weight: number;
    price: number;
    img: string;
    discount: number;
}

const Item: React.FC<ForgotCartProps> = ({ name, weight, price, img,   }) => {
      const added = () => {
        console.log("added", name);
        
      }
      const dalete = () => {
        console.log("dalete", name);
      }

    return (
        <>
            <div className="busket__forgot-cart bg-[#fff]">
                <div className="busket__forgot-inner">
                  <AddItem setDalete={dalete} setAdded={added} />
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

export default Item;
