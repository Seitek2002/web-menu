import { FC, useState } from 'react';
import { IProductCatalog } from 'src/types/products.types';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { addItem } from 'src/store/yourFeatureSlice';
import { useAppSelector } from 'src/hooks/useAppSelector';

import close from './close.svg';
import minus from './minus.svg';
import plus from './plus.svg';

import './style.scss';

interface IProps {
  item?: IProductCatalog;
  setIsShow: () => void;
  isShow: boolean;
}

const FoodDetail: FC<IProps> = ({ setIsShow, item, isShow }) => {
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const [containerCounter, setContainerCounter] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [counter, setCounter] = useState(1);
  const sizes = [...(item?.modificators || [])];
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const ContainerCounter = (delta: number) => {
    setContainerCounter((prev) => Math.max(1, prev + delta));
  };

  const handleDone = () => {
    const selectedData = {
      // sugar,
      // containerAdd,
      // counter,
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

  return (
    <>
      <div className={'food-detailll' + (isShow ? ' active' : '')}>
        <div
          className='food-detailll__bg'
          style={{ backgroundColor: '#000' }}
        ></div>
        <div
          className='food-detailll__wrapper'
          style={{ backgroundColor: '#fff' }}
        >
          <img
            src={close}
            alt=''
            className='food-detailll__close'
            onClick={setIsShow}
          />
          <img
            src={item?.productPhoto}
            alt='img'
            className='food-detailll__img'
          />
          <div className='food-detailll__content'>
            <div className='food-detailll__head'>
              <h3 className='food-detailll__title' style={{ color: '#090A0B' }}>
                {item?.productName}
              </h3>
              <p className='food-detailll__price' style={{ color: colorTheme }}>
                {item?.productPrice} с
              </p>
            </div>
            <p
              className='food-detailll__description'
              style={{ color: '#090A0B' }}
            >
              {item?.productDescription} Кофейный напиток с добавлением молока и
              двух шотов эспрессо, так же можно добавить сахарили сироп
            </p>
            <div className='food-detailll__btns'>
              <div
                className='food-detailll__quantity-btn'
                style={{ backgroundColor: '#F1F2F3', color: '#090A0B' }}
              >
                <img
                  src={minus}
                  alt='minus'
                  onClick={() => setCounter((prev) => Math.max(1, prev - 1))}
                />
                {counter}
                <img
                  src={plus}
                  alt='plus'
                  onClick={() => setCounter(counter + 1)}
                />
              </div>
              <button
                onClick={handleDone}
                className='food-detailll__add-btn'
                style={{ backgroundColor: colorTheme, color: '#fff' }}
              >
                {t('counter')}
              </button>
            </div>
            <div className='food-detailll__lil-head'>
              <h4
                className='food-detailll__lil-head-sabtitle'
                style={{ color: '#090A0B' }}
              >
                {t('size.sizeChoose')}
              </h4>
              <h4
                className='food-detailll__lil-head-required'
                style={{ color: colorTheme }}
              >
                {t('foodDetail.ingredients.necessarily')}
              </h4>
            </div>
            <div className='food-detailll__size'>
              {sizes?.map((sizeKey, index) => (
                <div
                  key={index}
                  className={`food-detailll__size-item`}
                  style={{
                    borderColor:
                      selectedSize === sizeKey.name
                        ? colorTheme
                        : 'transparent',
                    borderWidth: selectedSize === sizeKey.name ? '1px' : '0',
                    backgroundColor:
                      selectedSize === sizeKey.name ? '#fff' : '#F1F2F3',
                  }}
                  onClick={() => setSelectedSize(sizeKey.name)}
                >
                  <span
                    className='food-detailll__size-title'
                    style={{ color: '#090A0B' }}
                  >
                    {sizeKey.name}
                  </span>
                  <div className='price' style={{ color: '#626576' }}>
                    {sizeKey.price}
                  </div>
                </div>
              ))}
            </div>
            <div className='food-detailll__container'>
              <div className='food-detailll__container-btn'>
                <img
                  src={minus}
                  alt='minus'
                  onClick={() => ContainerCounter(-1)}
                />
                {containerCounter}
                <img
                  src={plus}
                  alt='plus'
                  onClick={() => ContainerCounter(1)}
                />
              </div>
              <span
                className='food-detailll__container-money'
                style={{ color: '#090A0B', fontWeight: '600' }}
              >
                {t('container.container')}
              </span>
              <h4
                className='detailll__ingridients-title'
                style={{ color: '#626576' }}
              >
                {t('container.price')}
              </h4>
            </div>
            <div className='food-detailll__ingridients'>
              <ul
                className='detailll__ingridients-list'
                style={{ color: '#090A0B' }}
              >
                <li>
                  <p style={{ color: '#090A0B' }}>
                    Лепешка тортилья — мягкая, слегка обжаренная, с золотистой
                    корочкой.
                  </p>
                </li>
                <li>
                  <p style={{ color: '#090A0B' }}>
                    Куриное филе в острой панировке — хрустящее снаружи, сочное
                    внутри, с пикантными специями.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetail;
