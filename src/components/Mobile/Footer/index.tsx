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
  const handleClick = () => {
    // addPoster({
    //   comment: '',
    //   createdAt: new Date().toISOString(),
    //   id: 0,
    //   phone: '',
    //   serviceMode: 1,
    //   status: 1,
    //   servicePrice: '0',
    //   tipsPrice: '0',
    //   orderProducts: cart,
    // });
    navigate('/cart' + localStorage.getItem('currentUrl'));

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  if (!cart.length) return null;

  return (
    <footer className={`footer bg-[#fff] ${position || 'fixed'}`}>
      <div className='container'>
        {/* <Link to={`${location.pathname}/cart`} className='footer__content'> */}
        <div className='footer__content'>
          <button className='bg-[#875AFF] text-[#fff]' onClick={handleClick}>
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
        {/* </Link> */}
      </div>
    </footer>
  );
};

export default Footer;
