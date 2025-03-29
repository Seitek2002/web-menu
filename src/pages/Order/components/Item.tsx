import { FC } from 'react';

import './style.scss';

interface IProps {
  img: string;
  name: string;
  price: number;
  weight: number;
  quantity: number;
}

const Item: FC<IProps> = ({ img, name, price, weight, quantity }) => {
  const colorTheme = 'red';

  return (
    <div className='order__status-list-item'>
      <div className='order__status-list-img-wrapper'>
        <img src={img} alt={name} />
      </div>
      <div className='order__status-list-info-wrapper'>
        <div className='order__status-list-info'>
          <h5 className='order__status-list-name text-[#090A0B]'>{name}</h5>
          <span className='order__status-list-weight text-[#727272]'>
            {weight} г
          </span>
        </div>
        <div className='order__status-list-info'>
          <span
            className='order__status-list-price'
            style={{ color: colorTheme }}
          >
            {price} с
          </span>
          <span className='order__status-list-quantity text-[#727272]'>
            {quantity} шт
          </span>
        </div>
      </div>
    </div>
  );
};

export default Item;
