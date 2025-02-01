import { FC, useState } from 'react';
import { addItem, removeItem } from '../../../store/yourFeatureSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import ContentLoader from 'react-content-loader';
import { IProductCatalog } from 'src/types/products.types';

import whitePlus from '../../../assets/icons/cart/plus.svg';
import whiteMinus from '../../../assets/icons/cart/minus.svg';

import './style.scss';

interface IProps extends IProductCatalog {
  setIsShow: () => void;
  onClick: () => void;
}

const Item: FC<IProps> = ({
  id,
  productName,
  productPrice,
  productPhoto,
  category,
  weight,
  setIsShow,
  onClick,
  modificators,
}) => {
  const [count, setCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (modificators && modificators.length > 0) {
      onClick();
      setIsShow();
    } else {
      setCount((prev) => prev + 1);
      dispatch(
        addItem({
          id,
          productName,
          productPrice,
          productPhoto,
          weight,
          category,
          quantity: 1,
          modificators: [],
        })
      );
    }
  };

  const handleUnClick = () => {
    setCount((prev) => Math.max(0, prev - 1));
    dispatch(
      removeItem({
        id,
        productName,
        productPrice,
        weight,
        productPhoto,
        category,
        quantity: 0,
        modificators: [],
      })
    );
  };

  return (
    <div className='cart-block'>
      <div className='cart-img'>
        {!isLoaded && (
          <ContentLoader
            speed={1.5}
            width='100%'
            height='100%'
            backgroundColor='#bebebe'
            foregroundColor='#fff'
            style={{
              padding: '4px',
            }}
          >
            <rect className='skeleton-img' y='0' rx='12' ry='12' />
          </ContentLoader>
        )}
        <img
          src={productPhoto}
          alt='img'
          onLoad={() => setIsLoaded(true)}
          className={isLoaded ? '' : 'hidden'}
          onClick={setIsShow}
        />
      </div>
      <div className='cart-info'>
        <span className='cart-price'>{productPrice} с</span>
        {/* <span className="cart-category">•{category.categoryName}</span> */}
      </div>
      <h4 className='cart-name'>{productName}</h4>
      {count === 0 ? (
        <button className='cart-btn' onClick={handleClick}>
          Добавить
        </button>
      ) : (
        <div className='cart-btn active'>
          <img onClick={handleUnClick} src={whiteMinus} alt='minus' />
          <span className='cart-count'>{count}</span>
          <img onClick={handleClick} src={whitePlus} alt='plus' />
        </div>
      )}
    </div>
  );
};

export default Item;
