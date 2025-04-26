import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/useAppSelector';
import BusketCard from 'components/Cards/Cart';

import './style.scss';

const BusketDesktop = ({ to, createOrder, disabled }: { createOrder?: () => void, to: string, disabled?: boolean }) => {
  const navigate = useNavigate();
  const colorTheme = useAppSelector(state => state.yourFeature.venue?.colorTheme);
  const venueData = useAppSelector(state => state.yourFeature.venue);
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const location = useLocation();

  const handleClick = () => {
    if(location.pathname === '/cart') {
      if(createOrder) createOrder()
    } else {
      navigate(to)
    }
  }

  return (
    <div className='busket__content'>
      {
        venueData?.table?.tableNum && (
          <div className='table-num'>Стол №12</div>
        )
      }
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <BusketCard key={item.id} item={item} />
          ))}
          <button style={{ backgroundColor: colorTheme }} onClick={handleClick} disabled={disabled}>Далее</button>
        </>
      ) : (
        <div className='busket__empty text-center'>
          Добавьте товары в корзину
        </div>
      )}
    </div>
  );
};

export default BusketDesktop;
