import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import checkbox from '../../../../assets/icons/Busket/checkbox.svg';
import { useAppSelector } from 'src/hooks/useAppSelector';

import './style.scss';

const Where: React.FC = () => {
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const { t, i18n } = useTranslation();

  const list = useMemo(
    () => [t('busket.where.takeaway'), t('busket.where.dinein')],
    [i18n.language]
  );

  const VibrationClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const [activeIndex, setActiveIndex] = useState(1); // Используем индекс вместо значения

  useEffect(() => {
    setActiveIndex(1); // Обновляем активный индекс, когда список меняется
  }, [list]);

  return (
    <div className='busket__order-type'>
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setActiveIndex(index);
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
