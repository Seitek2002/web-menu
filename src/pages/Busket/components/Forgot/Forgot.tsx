import Item from "./Item";
import cookie from "src/assets/icons/Busket/cookie.svg";
import "./style.scss";

interface IProductModificator {
  id: number;
  name: string;
  price: string;
}
interface ItemProps {
  id: number;
  productName: string;
  productPrice: string;
  productDescription: string | null;
  productPhoto: string;
  weight: number;
  category: {
      id: number;
      categoryName: string;
  },
  modificators: IProductModificator[]
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
