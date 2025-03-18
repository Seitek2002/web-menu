import { FC } from 'react';
// import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { IVenues } from '../../../../../types/venues.types';

import clock from '../../../../../assets/icons/Header/Clock.svg';

import './style.scss';

const Header: FC<{ venueData: IVenues | undefined }> = ({ venueData }) => {
  // const { t } = useTranslation();
  const { table } = useParams<{ table?: string }>(); // Получаем номер стола из URL

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__content'>
          <div className='header__logo'>
            <div className='w-[60px] rounded-full overflow-hidden'>
              <img src={venueData?.logo} alt='logo' />
            </div>
            <div className='header__info'>
              <p className='header__name text-[#090A0B]'>
                {venueData?.companyName}
              </p>
              <div className='header__inner'>
                <img src={clock} alt='icon' />
                <p className='header__time text-[#626576]'>
                  {venueData?.schedule}
                </p>
              </div>
            </div>
          </div>
          <div className='header__table bg-[#fff]'>
            <p className='text-[#626576]'>
              {table ? `Стол №${table}` : 'На вынос'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
