import { FC } from 'react';
import Menu from 'src/components/Menu';

import './style.scss';

interface IProps {
  selectedCategory: number | undefined;
  searchText: string;
}

const Catalog: FC<IProps> = ({ selectedCategory, searchText }) => {

  return (
    <section className='cart'>
      <div className='container'>
        <Menu selectedCategory={selectedCategory} searchText={searchText} />
      </div>
    </section>
  );
};

export default Catalog;
