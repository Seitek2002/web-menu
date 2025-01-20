import { FC, useState } from 'react';
import { addItem, removeItem } from '../../store/yourFeatureSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import ContentLoader from 'react-content-loader';

import whitePlus from '../../assets/icons/cart/plus.svg';
import whiteMinus from '../../assets/icons/cart/minus.svg';

import './style.scss';

interface IProps {
  id: string;
  name: string;
  weight: number;
  price: number;
  img: string;
  discount?: number;
  promotion?: boolean;
}

const Item: FC<IProps> = ({
  name,
  weight,
  price,
  img,
  discount,
  promotion,
  id,
}) => {
  const [count, setCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setCount(count + 1);
    dispatch(
      addItem({
        id,
        name,
        weight,
        price,
        img,
        discount,
        promotion,
        quantity: 1,
      })
    );
  };
  const handleUnClick = () => {
    setCount(count - 1);
    dispatch(
      removeItem({
        id,
        name,
        weight,
        price,
        img,
        discount,
        promotion,
        quantity: 0,
      })
    );
  };

  return (
    <>
      <div className='cart-block'>
        <div className='cart-img'>
          {!isLoaded && (
            <ContentLoader
              speed={1.5}
              width={'100%'}
              height={'100%'}
              backgroundColor='#bebebe'
              foregroundColor='#fff'
              style={{
                padding: '4px',
              }}
            >
              <rect className='skeleton-img' y='0' rx='12' ry='12' />
            </ContentLoader>
          )}
          <img src={img} alt='img' onLoad={() => setIsLoaded(true)} className={isLoaded ? '' : 'hidden'} />
        </div>
        <div className='cart-info'>
          <span className='cart-price'>{price} с</span>

          <span className='cart-weight'>•{weight}г</span>
        </div>
        <h4 className='cart-name'>{name}</h4>
        {count === 0 ? (
          <button className='cart-btn' onClick={handleClick}>
            Добавить
          </button>
        ) : (
          <>
            <button className='cart-btn active'>
              <img onClick={handleUnClick} src={whiteMinus} alt='img' />
              <span className='cart-count'>{count}</span>
              <img onClick={handleClick} src={whitePlus} alt='img' />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Item;
