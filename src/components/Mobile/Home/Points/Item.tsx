import { FC } from "react";
import "./style.scss";
import { useAppSelector } from "src/hooks/useAppSelector";

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
  const colorTheme = useAppSelector(state => state.yourFeature.venue?.colorTheme);

  return (
    <div
      className={`mobile point-item ${active === item.id ? "active" : ""}`}
      key={item.id}
      onClick={() => selectCategory(item.id)}
    >
      <div
        className={`mobile point-wrapper`}
        style={{
          backgroundColor: active === item.id ? colorTheme : '#F9F9F9', 
          borderColor: active === item.id ? colorTheme : 'white',
        }}
      >
        <img src={item.categoryPhoto} alt="icon" />
      </div>
      <p>{item.categoryName}</p>
    </div>
  );
};

export default Item;
