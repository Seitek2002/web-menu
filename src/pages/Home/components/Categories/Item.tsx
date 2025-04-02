import { FC } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';

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
    <div
      className={`categories__item ${active === item.id ? 'active' : ''}`}
      key={item.id}
      onClick={() => selectCategory(item.id)}
    >
      <div
        className={`categories__wrapper`}
        style={{
          backgroundColor: active === item.id ? colorTheme : 'white',
          borderColor: active === item.id ? colorTheme : 'white',
        }}
      >
        <img src={item.categoryPhoto} alt='icon' />
        <span className='leading-tight hidden md:block'>
          {item.categoryName}
        </span>
      </div>
      <span className='leading-tight block md:hidden'>{item.categoryName}</span>
    </div>
  );
};

export default Item;
