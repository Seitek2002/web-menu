import { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import './style.scss';

const Footer: FC = () => {
  const cart = useAppSelector(state => state.yourFeature.items); 
  const buttonText = useSelector((state: RootState) => state.yourFeature.buttonText);


  if(!cart.length) return null;

  return (
    <footer className='footer bg-[#fff]'>
      <div className='container'>
        <Link to='/cart' className='footer__content'>
          <button className='bg-[#875AFF] text-[#fff]'> 
            {buttonText}
            <span>{ cart.reduce((acc, item) => acc + +item.productPrice * item.quantity, 0) } с</span>
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
