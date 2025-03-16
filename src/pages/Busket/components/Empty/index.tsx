import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import emptyCartWebp from '../../../../assets/images/cart/empty-cart.webp';

const Empty: FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className='busket__empty'>
      <h2>Добавьте товары в корзину</h2>
      <img src={emptyCartWebp} alt='empty-cart-png' />
      <button onClick={handleClick} className='bg-[#F1F2F3]'>
        {' '}
        В меню
      </button>
    </div>
  );
};

export default Empty;
