import { FC } from 'react';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { IProductCatalog } from 'src/types/products.types';
import { addItem, removeItem } from '../../store/yourFeatureSlice';

import plus from '../../assets/icons/Busket/plus.svg';
import minus from '../../assets/icons/Busket/minus.svg';

import './style.scss'

type IProps = IProductCatalog & {
  quantity: number;
  cartLength: boolean; // Добавляем это сюда
};

const CardBusket: FC<IProps> = ({
  id,
  productName,
  weight,
  productPrice,
  productPhoto,
  category,
  modificators,
  quantity,
  cartLength,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      addItem({
        id,
        productName,
        productPrice,
        productPhoto,
        weight,
        category,
        quantity: 1,
        modificators,
      })
    );
  };

  const handleUnClick = () => {
    dispatch(
      removeItem({
        id,
        productName,
        productPrice,
        weight,
        productPhoto,
        category,
        quantity: 0,
        modificators,
      })
    );
  };

  return (
    <>
      <div className='busket-item '>
        <div className='busket-loy'>
          {cartLength ? (
            <>
              <img className='busket-img' src={productPhoto} alt='img' />
              <div className='busket-inner'>
                <p className='busket-name'>{productName}</p>
                <div className='busket-info'>
                  <span className='busket-cart-price text-[#875AFF]'>
                    {productPrice} c
                  </span>
                  <span className='busket-g text-[#ADADAD]'>•{weight}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='busket-inner'>
                <p className='busket-name'>
                  {productName}{' '}
                  <span className='busket-cart-price text-[#875AFF]'>
                    {productPrice} c
                  </span>
                  <span className='busket-g text-[#ADADAD]'>•{weight}</span>
                </p>
              </div>
            </>
          )}
        </div>
        <button className='busket-btn bg-[#F1F2F3]'>
          <img src={minus} alt='minus' onClick={handleUnClick} />
          {quantity}
          <img src={plus} alt='plus' onClick={handleClick} />
        </button>
      </div>
    </>
  );
};

export default CardBusket;
