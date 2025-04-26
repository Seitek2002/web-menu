import { FC } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import close from 'assets/icons/close.svg';

import './index.scss';

import { clearCart } from 'src/store/yourFeatureSlice';

interface IProps {
  isShow: boolean;
  setActive: (boolean: boolean) => void;
}

const ClearCartModal: FC<IProps> = ({ isShow, setActive }) => {
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  const handleClose = () => {
    setActive(!isShow);
  };

  const handleClear = () => {
    setActive(!isShow);
    dispatch(clearCart());
  };

  return (
    <>
      <div
        className={isShow ? 'overlay active' : 'overlay'}
        onClick={handleClose}
      ></div>
      <div className={isShow ? 'clear-cart-modal active' : 'clear-cart-modal'}>
        <img src={close} alt='close-icon' onClick={handleClose} />
        <h3 className='text-[20px] font-medium'>Очистить корзину?</h3>
        <div className='clear-cart-modal__btns'>
          <button className='bg-[#F9F9F9]' onClick={handleClose}>Отмена</button>
          <button
            style={{ backgroundColor: colorTheme }}
            className='text-white'
            onClick={handleClear}
          >
            Очистить
          </button>
        </div>
      </div>
    </>
  );
};

export default ClearCartModal;
