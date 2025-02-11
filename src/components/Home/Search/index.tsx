import { FC, useRef, useState } from 'react';

import search from '../../../assets/icons/Search/search.svg';
import close from '../../../assets/icons/Search/close.svg';
import arrowBack from '../../../assets/icons/Search/arrow-back.svg';
import all from '../../../assets/icons/points/all.svg';

import './style.scss';

interface IProps {
  onToggle: () => void;
}

const Search: FC<IProps> = ({ onToggle }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    inputRef.current?.focus();
  };

  const onClose = () => {
    if (inputValue) {
      setInputValue('');
    } else {
      onToggle();
    }
  };

  return (
    <>
      <section className='search bg-[#F1F2F3]'>
        <div className='container'>
          <div className='search-content'>
            <div className='search-top'>
              <div onClick={onClose} className='search-back'>
                <img src={arrowBack} alt='' />
              </div>
              <div className='search-input bg-white'>
                <img src={search} alt='search' onClick={handleSearchClick} />

                <input
                  ref={inputRef}
                  type='text'
                  placeholder='Поиск...'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className='text-[#090A0B]'
                />
                <img onClick={onClose} src={close} alt='close' />
              </div>
            </div>
            <h2 className='search-title text-[#090A0B]'>Категории</h2>
            <div className='search-perent'>
              <div className='search-item'>
                <div className='search-wrapper bg-[#F9F9F9]'>
                  <img src={all} alt='icon' />
                </div>
                <p className='search-name'>Все</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
