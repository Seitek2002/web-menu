import { FC } from 'react';

import checkedGreen from '../../../assets/icons/OrderStatus/checked-green.svg';
import pending from '../../../assets/icons/OrderStatus/pending.svg';

import './styles.scss';

interface OrderStatusCardProps {
  status: 'accepted' | 'pending';
  title: string;
  message: string;
}

const OrderStatusCard: FC<OrderStatusCardProps> = ({
  status,
  title,
  message,
}) => {
  const isAccepted = status === 'accepted';

  return (
    <div className={`order-status-card ${isAccepted ? 'accepted' : 'pending'}`}>
      <div className='order-status-card__content'>
        <h3 className='title'>{title}</h3>
        <p className='message'>{message}</p>
      </div>
      <div className='order-status-card__icon'>
        {isAccepted ? (
          <img src={checkedGreen} alt='checked' />
        ) : (
          <img src={pending} alt='pending' />
        )}
      </div>
    </div>
  );
};

export default OrderStatusCard;
