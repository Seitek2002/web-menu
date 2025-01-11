import { FC } from 'react';
import logo from '../../assets/icons/Header/logo.svg';
import table from '../../assets/icons/Header/table.svg';
import './style.scss';

const Header: FC = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__content'>
          <div className="header__logo">
            <img src={logo} alt="logo" />
            <div className="header__info">
              <p className="header__name">Жираф</p> 
              <div className="header__inner">
                <img src={table} alt="icon" /> <p className="header__table">Стол №12</p>
              </div>
            </div>
          </div>
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
