import { FC, useEffect, useMemo, useState } from 'react';

import { ISpot } from 'types/venues.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import './style.scss';

import { useMask } from '@react-input/mask';
import { setUsersData } from 'src/store/yourFeatureSlice';
import { loadUsersDataFromStorage } from 'src/utlis/storageUtils';

interface IProps {
  spots: ISpot[];
}

const Tabs: FC<IProps> = ({ spots }) => {
  const dispatch = useAppDispatch();
  const userData = loadUsersDataFromStorage();
  const [isActive, setIsActive] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [address, setAddress] = useState(userData.address || '');
  const [comment, setComment] = useState(userData.comment);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  const inputRef = useMask({
    mask: '+996 (___) ___-___',
    replacement: { _: /\d/ },
  });

  const tabs = useMemo(() => {
    return ['Доставка', 'Самовывоз'];
  }, []);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      phoneNumber,
      type: isActive,
      comment,
      address,
    };
    console.log(data);
    dispatch(setUsersData(data));
  };

  const isFormValid = useMemo(() => {
    return phoneNumber.length === 18 && address.trim().length > 3;
  }, [phoneNumber, address]);

  useEffect(() => {
    setIsActive(tabs[0]);
  }, [spots, tabs]);

  return (
    <div className='tabs'>
      <div className='tabs__select'>
        {tabs.map((tab) => (
          <div
            className={
              isActive === tab
                ? 'tabs__select-item active'
                : 'tabs__select-item'
            }
            key={tab}
            onClick={() => setIsActive(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      {isActive === 'Самовывоз' ? (
        <div className='tabs__pickup'>
          {spots.map((spot) => (
            <button
              className='tabs__pickup-item'
              style={{ backgroundColor: colorTheme }}
              key={spot.id}
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M16.6415 16.2445C18.0423 14.3001 19 12.1631 19 10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10C5 12.1631 5.95769 14.3001 7.35846 16.2445C8.74868 18.1742 10.4581 19.7503 11.6769 20.7485C11.8768 20.9122 12.1232 20.9122 12.3231 20.7485C13.5419 19.7503 15.2513 18.1742 16.6415 16.2445ZM13.5904 22.2957C16.1746 20.1791 21 15.4917 21 10C21 5.02944 16.9706 1 12 1C7.02944 1 3 5.02944 3 10C3 15.4917 7.82537 20.1791 10.4096 22.2957C11.3466 23.0631 12.6534 23.0631 13.5904 22.2957Z'
                  fill='#fff'
                />
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10Z'
                  fill='#fff'
                />
              </svg>
              <div>
                <span className='tabs__pickup-item-name'>{spot.name}</span>
                <span className='tabs__pickup-item-address'>
                  {spot.address}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className='tabs__content'>
          <form className='cart__contacts' onSubmit={handleClick}>
            <div className='flex items-center justify-between mb-[12px]'>
              <h4>Ваши контакты</h4>
              <span className='required' style={{ color: colorTheme }}>
                Обязательно*
              </span>
            </div>
            <input
              required
              type='text'
              placeholder='+996'
              ref={inputRef}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              required
              type='text'
              placeholder='Адрес или ссылка на 2гис'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type='text'
              placeholder='Напишите время заказа или коментарий'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className='tabs__btn'
              style={{ backgroundColor: colorTheme }}
              disabled={!isFormValid}
            >
              Далее
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tabs;
