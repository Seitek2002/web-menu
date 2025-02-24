import { FC, useState } from 'react';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { IProductCatalog } from 'src/types/products.types';
import { addItem, removeItem } from '../../../../store/yourFeatureSlice';

import plus from "../../../../assets/icons/Busket/back.svg"
import minus from "../../../../assets/icons/Busket/minus.svg";

import "./style.scss"

type IProps = IProductCatalog & {
  quantity: number;
  cartLength: boolean; // Добавляем это сюда
};

const Item: FC<IProps> = ({
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
  const [count, setCount] = useState<number>(quantity);
  const dispatch = useAppDispatch();

  // const handleClick = () => {
  //   setCount(count + 1);
  //   dispatch(
  //     addItem({
  //       id,
  //       productName,
  //       productPrice,
  //       productPhoto,
  //       weight,
  //       category,
  //       quantity: 1,
  //       modificators,
  //     })
  //   );
  // };

  // const handleUnClick = () => {
  //   if (count) {
  //     setCount(count - 1);
  //   }
  //   dispatch(
  //     removeItem({
  //       id,
  //       productName,
  //       productPrice,
  //       weight,
  //       productPhoto,
  //       category,
  //       quantity: 0,
  //       modificators,
  //     })
  //   );
  // };

  return (
    <>
      <div className='busket__item '>
        <div className='busket__loy'>
          {cartLength ? (
            <>
              <img className='busket__img' src={productPhoto} alt='img' />
              <div className='busket__inner'>
                <p className='busket__name'>{productName}</p>
                <div className='busket__info'>
                  <span className='busket__cart-price text-[#875AFF]'>
                    {productPrice} c
                  </span>
                  <span className='busket__g text-[#ADADAD]'>•{weight}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='busket__inner'>
                <p className='busket__name'>
                  {productName}
                  <span className='busket__cart-price text-[#875AFF]'>
                    {productPrice} c
                  </span>
                  <span className='busket__g text-[#ADADAD]'>•{weight}</span>
                </p>
              </div>
            </>
          )}
        </div>
        <button className='busket__btn bg-[#F1F2F3]'>
          <img src={minus} alt='minus' onClick={handleUnClick} />
          {count}
          <img src={plus} alt='plus' onClick={handleClick} />
        </button>
      </div>
    </>
  );
};

export default Item;
