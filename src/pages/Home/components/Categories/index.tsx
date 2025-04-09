import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetCategoriesQuery } from 'api/Categories.api';

import Item from './Item';

import all from 'assets/icons/Categories/all.svg';
import search from 'assets/icons/Categories/search.svg';

import './style.scss';

interface IProps {
  onCategoryChange: (id: number | undefined) => void;
  onSearchChange: (bool: boolean) => void;
}

const Categories: FC<IProps> = ({ onCategoryChange, onSearchChange }) => {
  const params = useParams<{ venue: string }>();
  const { data: categories } = useGetCategoriesQuery({
    venueSlug: params.venue,
  });
  const [active, setActive] = useState<number | undefined>(0);

  const selectCategory = (id: number | undefined) => {
    if (id === -1) {
      onSearchChange(true);
    }
    setActive(id);
    onCategoryChange(id ?? undefined);

    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <section className='categories'>
      <div className='categories__content'>
        <div className='md:hidden'>
          <Item
            item={{
              id: -1,
              categoryPhoto: search,
              categoryName: 'Поиск',
            }}
            active={active}
            selectCategory={selectCategory}
          />
        </div>
        <Item
          item={{
            id: 0,
            categoryPhoto: all,
            categoryName: 'Все',
          }}
          active={active}
          selectCategory={selectCategory}
        />
        {categories?.map((item) => (
          <Item
            key={item.id}
            item={item}
            active={active}
            selectCategory={selectCategory}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
