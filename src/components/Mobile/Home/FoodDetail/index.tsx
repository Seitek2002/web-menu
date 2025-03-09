import { FC, useState } from 'react';
import { IProductCatalog, IProductModificator } from 'src/types/products.types';
import { useGesture } from '@use-gesture/react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { addItem } from 'src/store/yourFeatureSlice';

// import addContainer from './add-container.svg';
import close from './close.svg';
// import minus from './minus.svg';
// import plus from './plus.svg';

import './style.scss';

interface IProps {
  item?: IProductCatalog;
  setIsShow: () => void;
  isShow: boolean;
}

const FoodDetail: FC<IProps> = ({ setIsShow, item, isShow }) => {
  const { t } = useTranslation();
  // const [sugar, setSugar] = useState<"with" | "without">("with");
  // const [containerAdd, setContainerAdd] = useState(0);
  const [counter, setCounter] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const sizes: IProductModificator[] = [...(item?.modificators || [])];
  const dispatch = useAppDispatch();
  const VibrationClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
  const handleCounterChange = (delta: number) => {
    setCounter((prev) => Math.max(1, prev + delta));
  };

  const handleDone = () => {
    const selectedData = {
      // sugar,
      // containerAdd,
      counter,
    };

    if (item) {
      dispatch(
        addItem({
          ...item,
          quantity: counter,
        })
      );
    }

    console.log('Выбранные данные:', selectedData);
  };

  const selectSize = (sizeKey: IProductModificator) => {
    setSelectedSize(sizeKey.name)
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }

  const bind = useGesture({
    onDrag: ({ movement: [, y], down }) => {
      if (!down && y > 100) {
        setIsShow(); // Закрываем компонент при свайпе вниз
      }
    },
  });

  return (
    <div className={'food-detail bg-[#F1F2F3]' + (isShow ? ' active' : '')}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
      <img src={close} alt='' className='close' onClick={() => {setIsShow(), VibrationClick()}} />
      <div {...bind()} className='img-wrapper'>
        <img src={item?.productPhoto} alt='' />
      </div>
      <div className='food-detail__content'>
        <div className='description'>
          <h2 className='text-[#090A0B]'>{item?.productName}</h2>
          <p className='text-[#090A0B]'>{item?.productDescription}</p>
        </div>
        <div className='ingridients'>
          <h2 className='text-[#090A0B]'>
            {t('foodDetail.ingredients.structure')}
          </h2>
          <ul className='text-[#090A0B]'>
            <li>
              <p className='text-[#090A0B]'>
                Лепешка тортилья — мягкая, слегка обжаренная, с золотистой
                корочкой.
              </p>
            </li>
            <li>
              <p className='text-[#090A0B]'>
                Куриное филе в острой панировке — хрустящее снаружи, сочное
                внутри, с пикантными специями.
              </p>
            </li>
          </ul>
        </div>
        <div className='size'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[#090A0B]'>{t('size.sizeChoose')}</h2>
            <div className='required text-[#875AFF]'>
              {t('foodDetail.ingredients.necessarily')}
            </div>
          </div>
          <div className='size__content'>
            {sizes?.map((sizeKey, index) => (
              <div
                key={index}
                className={`size__item bg-white ${
                  selectedSize === sizeKey.name ? 'active border-[#875AFF]' : ''
                }`}
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                onClick={() => {selectSize(sizeKey), VibrationClick()}}
              >
                <span>{sizeKey.name}</span>
                <div className='price text-[#626576]'>{sizeKey.price}</div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className='case'>
          <div className='flex gap-[12px]'>
            {containerAdd ? (
              <div className='flex gap-[12px]'>
                <img
                  src={minus}
                  alt=''
                  onClick={() => {setContainerAdd(containerAdd - 1), VibrationClick()}}
                />
                {containerAdd}
                <img
                  src={plus}
                  alt=''
                  onClick={() => {setContainerAdd(containerAdd + 1), VibrationClick()}}
                />
              </div>
            ) : (
              <img
                src={addContainer}
                alt=''
                onClick={() => {setContainerAdd(1), VibrationClick()}}
              />
            )}
            <span>{t('container.container')}</span>
          </div>
          <div className='price text-[#626576]'>{t('container.price')}</div>
        </div> */}
      </div>
      <footer className='counter bg-[#fff]'>
        <div className='counter__left bg-[#F1F2F3]'>
          <svg
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onClick={() => {handleCounterChange(-1), VibrationClick()}}
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
          <span
            style={{ margin: '0 12px', fontSize: '16px', fontWeight: 'bold' }}
          >
            {counter}
          </span>
          <svg
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onClick={() => {handleCounterChange(1), VibrationClick()}}
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
        <div className='counter__right bg-[#875AFF] text-[#fff]'>
          {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
          <button onClick={() => {handleDone(), VibrationClick()}}>{t('counter')}</button>
        </div>
      </footer>
    </div>
  );
};

export default FoodDetail;
