import { FC, useState } from 'react';

import './style.scss';

import logo from '../../../assets/icons/siteHeader/logo.svg';
import arrow from '../../../assets/icons/header/black-arrow.svg';
import user from '../../../assets/icons/siteHeader/user.svg';

const SiteHeader: FC = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [active, setActive] = useState('RU');

  const toggleLanguageMenu = () => {
    setIsLanguageOpen((prev) => !prev);
  };

  const selectLanguage = (language: string) => {
    setActive(language);
    setIsLanguageOpen(false);
  };

  const list = ['RU', 'KG', 'ENG'];

  return (
    <header className='siteHeader'>
      <div className='container'>
        <div className='siteHeader__content'>
          <div className='siteHeader__logo'>
            <img src={logo} alt='logo' />
            <div className='siteHeader__info'>
              <p className='siteHeader__name'>iMenu.kg</p>
            </div>
          </div>
          <div className='siteHeader__block'>
            <div className='siteHeader__user'>
              <img src={user} alt='user' />
            </div>
            <div
              className={
                isLanguageOpen
                  ? 'siteHeader__language active'
                  : 'siteHeader__language'
              }
            >
              <div
                className={`siteHeader__language-selected ${
                  isLanguageOpen ? 'active' : ''
                }`}
                onClick={toggleLanguageMenu}
              >
                {' '}
                {active} <img src={arrow} alt='arrow' />{' '}
              </div>
              <div
                className={`siteHeader__wrapper ${
                  isLanguageOpen ? 'active' : ''
                }`}
              >
                {list
                  .filter((item) => item != active)
                  .map((item) => (
                    <div
                      className='siteHeader__item'
                      onClick={() => selectLanguage(item)}
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
