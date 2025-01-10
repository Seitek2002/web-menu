import { FC } from 'react';

import './style.scss';

const Header: FC = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__content'>
          <div className='header__num'>№12</div>
          <h2 className='font-benzin'>Лого</h2>
          <select defaultValue={'ru'}>
            <option value='ru'>RU</option>
            <option value='kg'>KG</option>
            <option value='eng'>ENG</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
