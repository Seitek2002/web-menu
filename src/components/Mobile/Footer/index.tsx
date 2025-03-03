import { FC } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import './style.scss';

const Footer: FC<{position?: string}> = ({ position }) => {
  const cart = useAppSelector(state => state.yourFeature.items); 
  const buttonText = useSelector((state: RootState) => state.yourFeature.buttonText);
  const handleClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  if(!cart.length) return null;

  return (
    <footer className={`footer bg-[#fff] ${position || 'fixed'}`}>
      <div className='container'>
        <Link to='/cart' className='footer__content'>
          <button className='bg-[#875AFF] text-[#fff]'
          onClick={handleClick}
          > 
            {buttonText}
            <span>{ cart.reduce((acc, item) => acc + +item.productPrice * item.quantity, 0) } с</span>
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
