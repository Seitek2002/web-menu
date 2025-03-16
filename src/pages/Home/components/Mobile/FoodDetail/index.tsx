import { FC, useState, useCallback } from 'react';
import { IProductCatalog, IProductModificator } from '../../../../../types/products.types';
import { useGesture } from '@use-gesture/react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { addItem } from '../../../../../store/yourFeatureSlice';
import { useAppSelector } from '../../../../../hooks/useAppSelector';

import close from './close.svg';
import './style.scss';

interface IProps {
  item?: IProductCatalog;
  setIsShow: () => void;
  isShow: boolean;
}

const FoodDetail: FC<IProps> = ({ setIsShow, item, isShow }) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const sizes: IProductModificator[] = item?.modificators || [];
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  ); // Получаем colorTheme из store

  const VibrationClick = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, []);

  const handleCounterChange = useCallback((delta: number) => {
    setCounter((prev) => Math.max(1, prev + delta));
  }, []);

  const handleDone = useCallback(() => {
    if (item) {
      dispatch(
        addItem({
          ...item,
          quantity: counter,
        })
      );
    }
  }, [counter, dispatch, item]);

  const selectSize = useCallback(
    (sizeKey: IProductModificator) => {
      setSelectedSize(sizeKey.name);
      VibrationClick();
    },
    [VibrationClick]
  );

  const bind = useGesture({
    onDrag: ({ movement: [, y], down }) => {
      if (!down && y > 100) {
        setIsShow(); // Закрываем компонент при свайпе вниз
      }
    },
  });

  const handleImageClick = () => {
    setIsShow(); // Закрыть модальное окно
    VibrationClick();
  };

  return (
    <div
      className={`food-detail ${isShow ? 'active' : ''}`}
      style={{ backgroundColor: '#F1F2F3' }}
    >
      <img
        src={close}
        alt='close'
        className='close'
        onClick={handleImageClick}
      />
      <div {...bind()} className='img-wrapper'>
        <img src={item?.productPhoto} alt='product' />
      </div>
      <div className='food-detail__content'>
        <div className='description'>
          <h2>{item?.productName}</h2>
          <p>{item?.productDescription}</p>
        </div>
        <div className='ingridients'>
          <h2>{t('foodDetail.ingredients.structure')}</h2>
          <ul>
            <li>
              <p>
                Лепешка тортилья — мягкая, слегка обжаренная, с золотистой
                корочкой.
              </p>
            </li>
            <li>
              <p>
                Куриное филе в острой панировке — хрустящее снаружи, сочное
                внутри, с пикантными специями.
              </p>
            </li>
          </ul>
        </div>
        <div className='size'>
          <div className='flex items-center justify-between'>
            <h2>{t('size.sizeChoose')}</h2>
            <div style={{ color: colorTheme }} className='required'>
              {t('foodDetail.ingredients.necessarily')}
            </div>
          </div>
          <div className='size__content'>
            {sizes?.map((sizeKey, index) => (
              <div
                key={index}
                className={`size__item bg-white ${
                  selectedSize === sizeKey.name ? 'active' : ''
                }`}
                style={{
                  borderColor: selectedSize === sizeKey.name ? colorTheme : '',
                }}
                onClick={() => selectSize(sizeKey)}
              >
                <span>{sizeKey.name}</span>
                <div className='price'>{sizeKey.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className='counter'>
        <div className='counter__left'>
          <svg
            onClick={() => handleCounterChange(-1)}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3.75 12H20.25'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>{counter}</span>
          <svg
            onClick={() => handleCounterChange(1)}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3.75 12H20.25'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 3.75V20.25'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div
          className='counter__right'
          style={{ backgroundColor: colorTheme, color: '#fff' }}
        >
          <button onClick={handleDone}>{t('counter')}</button>
        </div>
      </footer>
    </div>
  );
};

export default FoodDetail;
