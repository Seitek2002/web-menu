import Item from "./Item";
import cookie from "src/assets/icons/Busket/cookie.svg";
import "./style.scss";

interface ItemProps {
  id: number;
  name: string;
  weight: number;
  price: number;
  img: string;
  discount: number;
  promotion: boolean;
}

const Forgot: React.FC<{ list: ItemProps[] }> = ({ list }) => {
  

  return (
    <div className="busket__forgot">
      <h4 className="busket__forgot-title">
        Ничего не забыли?
        <img src={cookie} alt="cookie" />
      </h4>
      <div className="busket__forgot-wrapper">
        {list.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Forgot;
