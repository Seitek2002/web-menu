import { FC, useState, useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { IVenues } from 'src/types/venues.types';

import logo from '../../../../assets/icons/SiteHeader/logo.svg';
import arrow from '../../../../assets/icons/Header/black-arrow.svg';
import search from '../../../../assets/icons/SiteHeader/search.svg';
// import logoCompanion from '../../../../assets/icons/Header/logo.svg';
import clock from '../../../../assets/icons/Header/Clock.svg';
import bell from '../../../../assets/icons/Header/bell.svg';
import check from '../../../../assets/icons/Header/check.svg';

import './style.scss';

const SiteHeader: FC<{ setSearchText: (text: string) => void, venueData: IVenues | undefined }> = ({
  setSearchText,
  venueData
}) => {
  const { t, i18n } = useTranslation();
  const { table } = useParams<{ table?: string }>(); // Получаем номер стола из URL
  const [inputVal, setInputVal] = useState('');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [active, setActive] = useState('RU');

  const languageMap: { [key: string]: string } = {
    ru: 'RU',
    kg: 'KG',
    en: 'ENG',
  };

  useEffect(() => {
    const lang = i18n.language;
    setActive(languageMap[lang] || 'RU');
  }, [i18n.language]);

  const toggleLanguageMenu = () => {
    setIsLanguageOpen((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    setSearchText(e.target.value);
  };

  const selectLanguage = (language: string) => {
    const langCode = language === 'RU' ? 'ru' : language === 'KG' ? 'kg' : 'en';
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    setIsLanguageOpen(false);
  };

  const list = ['RU', 'KG', 'ENG'];

  return (
    <header className='desktop siteHeader pt-[20px]'>
      <div className='container'>
        <div className='desktop siteHeader__content'>
          <div className='desktop siteHeader__top'>
            <div className='desktop siteHeader__logo'>
              <img src={logo} alt='logo' />
              <div className='desktop siteHeader__info'>
                <p className='desktop siteHeader__name text-[#090A0B]'>
                  iMenu.kg
                </p>
              </div>
            </div>
            <div className='desktop siteHeader__search bg-[#F9F9F9]'>
              <img src={search} alt='search' />
              <input
                value={inputVal}
                type='text'
                placeholder={t('search')}
                onChange={(e) => handleChange(e)}
                className='flex-1'
              />
            </div>
            <div className='desktop siteHeader__block'>
              <div className='desktop siteHeader__language'>
                <div
                  className={`desktop siteHeader__language-selected bg-[#F9F9F9] ${
                    isLanguageOpen ? 'active' : ''
                  }`}
                  onClick={toggleLanguageMenu}
                >
                  {active} <img src={arrow} alt='arrow' />
                </div>
                {isLanguageOpen && (
                  <div className='desktop siteHeader__wrapper bg-[#F9F9F9] active'>
                    {list
                      .filter((item) => item !== active)
                      .map((item) => (
                        <div
                          className='desktop siteHeader__item text-[#090A0B] cursor-pointer'
                          onClick={() => selectLanguage(item)}
                          key={item}
                        >
                          {item}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className='desktop siteHeader__bottom'>
            <div className='desktop header__logo'>
              <div className='w-[60px] rounded-full overflow-hidden'>
                <img src={venueData?.logo} alt='logo' className='w-[100%]' />
              </div>
              <div className='desktop header__left'>
                <p className='desktop header__name text-[#090A0B]'>
                  {venueData?.companyName}
                </p>
                <div className='desktop header__inner'>
                  <img src={clock} alt='icon' />
                  <p className='desktop header__time text-[#626576]'>
                    {venueData?.schedule}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex gap-[20px]'>
              <div className='desktop siteHeader__notify'>
                <img src={bell} alt='bell' />
                <p>{t('notify')}</p>
              </div>
              <div className='desktop siteHeader__check'>
                <img src={check} alt='check' />
                <p>{t('check')}</p>
              </div>
              <div className='desktop header__table bg-[#F9F9F9]'>
                <p className='text-[#626576]'>
                  {table ? `Стол №${table}` : 'Выберите стол'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
