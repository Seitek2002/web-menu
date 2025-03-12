import { FC } from 'react';
import { useAppSelector } from 'src/hooks/useAppSelector';
import './style.scss';

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
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  return (
    <div key={item.id}>
      <div
        className="desktop point-item"
        style={{
          backgroundColor: active === item.id ? colorTheme : '#fff',
          color: active === item.id ? '#fff' : '#000',
        }}
        onClick={() => selectCategory(item.id)}
      >
        <img src={item.categoryPhoto} alt="icon" />
        <p>{item.categoryName}</p>
      </div>
    </div>
  );
};

export default Item;
