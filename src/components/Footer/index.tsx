import { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';

import './style.scss';

const Footer: FC = () => {
  const cart = useAppSelector(state => state.yourFeature.items); 

  if(!cart.length) return null;

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer__content'>
          <button>
            Добавить
            <span>{ cart.reduce((acc, item) => acc + item.price * item.quantity, 0) } с</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
