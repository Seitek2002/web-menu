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
    <div
      className={`mobile point-item ${active === item.id ? "active" : ""}`}
      key={item.id}
      onClick={() => selectCategory(item.id)}
    >
      <div
        className={`mobile point-wrapper ${
          active === item.id
            ? "bg-[#875AFF] border-[#875AFF]"
            : "border-white"
        }`}
      >
        <img src={item.categoryPhoto} alt="icon" />
      </div>
      <p>{item.categoryName}</p>
    </div>
  );
};

export default Item;
