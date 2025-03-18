import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import checkbox from '../../../../assets/icons/Busket/checkbox.svg';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setOrder } from 'src/store/yourFeatureSlice';

import './style.scss';

const Where: React.FC = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.yourFeature.order);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(1); // Используем индекс вместо значения

  const list = useMemo(
    () => [t('busket.where.takeaway'), t('busket.where.dinein')],
    [i18n.language]
  );

  const VibrationClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
    VibrationClick();
    dispatch(setOrder({ ...order, serviceMode: index })); // 0 — на вынос, 1 — внутри заведения
  };

  useEffect(() => {
    setActiveIndex(1); // Обновляем активный индекс, когда список меняется
  }, [list]);

  return (
    <div className='busket__order-type'>
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            handleClick(index);
            VibrationClick();
          }}
          className={`busket__order-type-wrapper bg-[#fff] border-[#e1e2e5] ${
            activeIndex === index ? `active` : ''
          }`}
          style={{
            borderColor: activeIndex === index ? colorTheme : '#e1e2e5', // динамическое применение цвета
          }}
        >
          {activeIndex === index ? (
            <img src={checkbox} alt='check' />
          ) : (
            <div className='busket__order-type-checkbox border-[#e1e2e5]'></div>
          )}
          {item}
        </div>
      ))}
    </div>
  );
};

export default Where;
