import { FC } from 'react';
// import { usePostOrdersMutation } from 'src/api/Orders.api';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useNavigate, useParams } from 'react-router-dom';

import './style.scss';

const Footer: FC<{ position?: string }> = ({ position }) => {
  const params = useParams<{ venue: string; bo: string; table: string }>();
  const navigate = useNavigate();
  // const [addPoster] = usePostOrdersMutation();
  const cart = useAppSelector((state) => state.yourFeature.items);
  const order = useAppSelector((state) => state.yourFeature.order);
  const buttonText = useSelector(
    (state: RootState) => state.yourFeature.buttonText
  );
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  const totalPrice = cart.reduce(
    (acc, item) => acc + +item.productPrice * item.quantity,
    0
  );

  const handleClick = () => {
    navigate('/cart/' + localStorage.getItem('currentUrl'));
    const objects = {
      ...order,
      servicePrice: totalPrice,
      orderProducts: cart.map((item) => ({
        product: item.id,
        count: item.quantity,
      })),
      venueSlug: params.venue,
      spotSlug: params.bo,
      tableNum: params.table,
    };
    console.log(objects);

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  if (!cart.length) return null;

  return (
    <footer
      className={`footer ${position || 'fixed'}`}
      style={{ backgroundColor: '#fff' }}
    >
      <div className='container'>
        <div className='footer__content'>
          <button
            style={{ backgroundColor: colorTheme, color: '#fff' }}
            onClick={handleClick}
            type='submit'
          >
            {buttonText}
            <span>{totalPrice} с</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
