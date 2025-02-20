import { FC } from 'react';
import Menu from 'src/components/Menu';

import './style.scss';

interface IProps {
  selectedCategory: number | undefined;
}

const Catalog: FC<IProps> = ({ selectedCategory }) => {

  return (
    <section className='cart'>
      <div className='container'>
        <Menu selectedCategory={selectedCategory} searchText={''} />
      </div>
    </section>
  );
};

export default Catalog;
