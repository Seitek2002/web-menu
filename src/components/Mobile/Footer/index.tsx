import { FC } from 'react';
// import { usePostOrdersMutation } from 'src/api/Orders.api';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';

import './style.scss';

const Footer: FC<{ position?: string }> = ({ position }) => {
  const navigate = useNavigate();
  // const [addPoster] = usePostOrdersMutation();
  const cart = useAppSelector((state) => state.yourFeature.items);
  const buttonText = useSelector(
    (state: RootState) => state.yourFeature.buttonText
  );
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  const handleClick = () => {
    navigate('/cart' + localStorage.getItem('currentUrl'));

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  if (!cart.length) return null;

  return (
    <footer className={`footer ${position || 'fixed'}`} style={{ backgroundColor: '#fff' }}>
      <div className='container'>
        <div className='footer__content'>
          <button 
            style={{ backgroundColor: colorTheme, color: '#fff' }} 
            onClick={handleClick}
          >
            {buttonText}
            <span>
              {cart.reduce(
                (acc, item) => acc + +item.productPrice * item.quantity,
                0
              )}{' '}
              с
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
