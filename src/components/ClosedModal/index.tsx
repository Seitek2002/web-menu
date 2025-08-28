import { FC } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';

import './index.scss';

interface ClosedModalProps {
  isShow: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const ClosedModal: FC<ClosedModalProps> = ({
  isShow,
  onClose,
  title,
  description,
}) => {
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  return (
    <>
      <div className={isShow ? 'overlay active' : 'overlay'} onClick={onClose} />
      <div className={isShow ? 'closed-modal active' : 'closed-modal'}>
        <h3 className='title'>
          {title ?? 'Сейчас нерабочее время'}
        </h3>
        <p className='desc'>
          {description ??
            'Оформление заказа недоступно. Пожалуйста, загляните в часы работы.'}
        </p>
        <button
          style={{ backgroundColor: colorTheme }}
          className='action'
          onClick={onClose}
        >
          Понятно
        </button>
      </div>
    </>
  );
};

export default ClosedModal;
