import { FC, useState } from 'react';

import { IProduct } from 'types/products.types';
import { useAppSelector } from 'hooks/useAppSelector';

import './style.scss';

interface IProps {
  item: IProduct;
  foodDetail?: (item: IProduct) => void;
}

const CatalogCard: FC<IProps> = ({ item, foodDetail }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const colorTheme = useAppSelector(state => state.yourFeature.venue?.colorTheme);

  const openFoodDetail = () => {
    if (foodDetail) foodDetail(item as IProduct);
  };

  const handleClick = () => {
    openFoodDetail();
  };

  return (
    <div className='cart-block bg-white'>
      <div className='cart-img'>
        {!isLoaded && (
          <div className='cart-img-skeleton absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse'></div>
        )}
        <img
          src={item.productPhoto}
          alt='img'
          onLoad={() => setIsLoaded(true)} // Когда загрузится — показываем
          className={`transition-opacity duration-300 cursor-pointer ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={openFoodDetail}
        />
      </div>
      <div className='cart-info'>
        <span className='cart-price' style={{ color: colorTheme }}>
          {+item.productPrice} с
        </span>
      </div>
      <h4 className='cart-name'>{item.productName}</h4>
      <button
        className='cart-btn bg-[#F1F2F3] text-[#000]'
        onClick={handleClick}
      >
        Добавить
      </button>
      {/* {quantity === 0 ? (
        <button className="cart-btn bg-[#F1F2F3] text-[#000]" onClick={handleClick}>
          Добавить
        </button>
      ) : (
        <div className="cart-btn active" style={{ backgroundColor: colorTheme }}>
          <img onClick={handleUnClick} src={whiteMinus} alt="minus" />
          <span className="cart-count text-[#fff]">{quantity}</span>
          <img onClick={handleClick} src={whitePlus} alt="plus" />
        </div>
      )} */}
    </div>
  );
};

export default CatalogCard;
