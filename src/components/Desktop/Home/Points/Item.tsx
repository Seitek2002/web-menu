import { FC } from "react";
import "./style.scss";

interface IProps {
  item: {
    id: number;
    categoryPhoto: string;
    categoryName: string;
  };
  active: number | undefined;
  selectCategory: (id: number | undefined) => void;
}

const Item: FC<IProps> = ({ item, active, selectCategory }) => {
  return (
    <div key={item.id}>
      <div
        className={`desktop point-item ${
          active === item.id ? "bg-[#875AFF] text-[#fff]" : "bg-[#fff]"
        }`}
        onClick={() => selectCategory(item.id)}
      >
        <img src={item.categoryPhoto} alt="icon" />
        <p>{item.categoryName}</p>
      </div>
    </div>
  );
};

export default Item;
