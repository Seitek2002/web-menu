import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ISpot } from 'types/venues.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import geoIcon from 'assets/icons/Order/geo.svg';

import './style.scss';

import { useMask } from '@react-input/mask';
import { setUsersData } from 'src/store/yourFeatureSlice';
import { loadUsersDataFromStorage } from 'src/utlis/storageUtils';

interface IProps {
  spots: ISpot[];
}

const Tabs: FC<IProps> = ({ spots }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
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
    dispatch(setUsersData(data));
    navigate(`/I/${params.venue}/d`);
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
              <img src={geoIcon} alt="geoIcon" />
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
