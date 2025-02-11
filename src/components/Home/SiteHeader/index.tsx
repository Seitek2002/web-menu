import { FC, useState } from 'react';

import './style.scss';

import logo from '../../../assets/icons/SiteHeader/logo.svg';
import arrow from '../../../assets/icons/Header/black-arrow.svg';
import user from '../../../assets/icons/SiteHeader/user.svg';

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
        <div className='siteHeader__content bg-[#fff]'>
          <div className='siteHeader__logo'>
            <img src={logo} alt='logo' />
            <div className='siteHeader__info'>
              <p className='siteHeader__name text-[#090A0B]'>iMenu.kg</p>
            </div>
          </div>
          <div className='siteHeader__block'>
            <div className='siteHeader__user bg-[#F9F9F9]'>
              <img src={user} alt='user' />
            </div>
            <div
              className={
                isLanguageOpen
                  ? 'siteHeader__language active'
                  : 'siteHeader__language text-[#090A0B]'
              }
            >
              <div
                className={`siteHeader__language-selected bg-[#F9F9F9] ${
                  isLanguageOpen ? 'active' : ''
                }`}
                onClick={toggleLanguageMenu}
              >
                {' '}
                {active} <img src={arrow} alt='arrow' />{' '}
              </div>
              <div
                className={`siteHeader__wrapper bg-[#F9F9F9] ${
                  isLanguageOpen ? 'active' : ''
                }`}
              >
                {list
                  .filter((item) => item != active)
                  .map((item) => (
                    <div
                      className='siteHeader__item text-[#090A0B]'
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
