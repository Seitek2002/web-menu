import { FC, useState } from 'react';
import { useGetCategoriesQuery } from '../../../../api/Categories.api';
import PointsSkeleton from '../../../../skeletons/Points';
import Search from '../Search';

import search from '../../../../assets/icons/points/search.svg';
import all from '../../../../assets/icons/points/all.svg';

import './style.scss';

interface IProps {
  onCategoryChange: (categoryId: number | undefined) => void;
}

const Points: FC<IProps> = ({ onCategoryChange }) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const [active, setActive] = useState<number | undefined>(0);
  const [show, setShow] = useState(false);

  const clickShow = () => {
    setShow(!show);
  };

  const selectCategory = (id: number | undefined) => {
    setActive(id);
    if (id) onCategoryChange(id);
    else onCategoryChange(undefined);
  }

  return (
    <section className='mobile point'>
      {show && <Search onToggle={clickShow} />}
      <div className='container'>
        <div className='point-perent'>
          <div
            className={`point-item ${active === -1 ? 'active' : ''}`}
            onClick={clickShow}
          >
            <div className='point-wrapper bg-[#F9F9F9] border-white'>
              <img src={search} alt='icon' />
            </div>
            <p>Поиск</p>
          </div>
          <div
            className={`point-item ${active === 0 ? 'active' : ''}`}
            onClick={() => selectCategory(0)}
          >
            <div className={`point-wrapper ${active === 0 ? 'bg-[#875AFF] border-[#875AFF]' : 'border-white'}`}>
              <img src={all} alt='icon' />
            </div>
            <p>Все</p>
          </div>
          {isLoading ? (
            <>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <PointsSkeleton key={index} />
                ))}
            </>
          ) : (
            <>
              {categories?.map((item) => (
                <div
                  className={`point-item ${active === item.id ? 'active' : ''}`}
                  key={item.id}
                  onClick={() => selectCategory(item.id)}
                >
                  <div className={`point-wrapper ${active === item.id ? 'bg-[#875AFF] border-[#875AFF]' : 'border-white'}`}>
                    <img src={item.categoryPhoto} alt='icon' />
                  </div>
                  <p>{item.categoryName}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Points;
