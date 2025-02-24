import { FC, useState } from 'react';

import share from '../../assets/icons/OrderStatus/share.svg';
import table from '../../assets/icons/OrderStatus/table.svg';

import doing from '../../assets/images/OrderStatus/doing.webp';
import wait from '../../assets/images/OrderStatus/wait.webp';
import cancel from '../../assets/images/OrderStatus/cancel.webp';
import checkedGreen from '../../assets/icons/OrderStatus/checked-green.svg';
import pending from '../../assets/icons/OrderStatus/pending.svg';

const OrderStatus: FC = () => {
  const [toggler, setToggler] = useState(0);

  const [activeList, setActiveList] = useState({
    id: 1,
    name: 'Спасибо. заказ принят!',
    text: 'ожидайте в течении 15-20 минут!',
    img: doing,
    icon: checkedGreen,
    titleColor: 'text-[#06C740]',
  });

  const list = [
    {
      id: 1,
      name: 'Спасибо. заказ принят!',
      text: 'ожидайте в течении 15-20 минут!',
      img: doing,
      icon: checkedGreen,
      titleColor: 'text-[#06C740]',
    },
    {
      id: 0,
      name: 'Спасибо заказ в ожидании',
      text: 'В ближайшие 5-10 минут администратор свяжется с Вами и уточнит детали',
      img: wait,
      icon: pending,
      titleColor: 'text-[#FF8400]',
    },
    {
      id: 2,
      name: 'Транзакция отменена',
      text: 'попробуйте сново',
      img: cancel,
      icon: '',
      titleColor: 'text-[#F80101]',
    },
  ];

  const changeToggle = () => {
    setToggler((prev) => {
      const newToggler = prev === 2 ? 0 : prev + 1;
      setActiveList(list[newToggler]);
      return newToggler;
    });
    console.log(toggler);
  };

  return (
    <>
      <div className='order__status-status bg-white shadow rounded self-start'>
        <h4
          onClick={changeToggle}
          className='order__status-status-title text-[#875AFF]'
        >
          <img src={table} alt='table' />
          Стол №12
        </h4>
        <img
          src={activeList.img}
          alt='doing'
          className='order__status-status-img'
        />
        {window.innerWidth <= 768 && (
          <div className='order__status-status-share bg-white'>
            <img src={share} alt='doing' />
          </div>
        )}

        <h4 className={'order__status-status-name ' + activeList.titleColor}>
          {activeList.icon && (
            <img
              src={activeList.icon}
              alt='doing'
              className='order__status-status-icon'
            />
          )}
          <div className=''>{activeList.name}</div>
        </h4>
        <p className='order__status-status-description text-[#ADADAD]'>
          {activeList.text}
        </p>
        {!(window.innerWidth <= 768) && (
          <button
            onClick={changeToggle}
            className='order__status-status-btn text-[#fff] bg-[#875AFF]'
          >
            Заказать еще
          </button>
        )}
      </div>
    </>
  );
};

export default OrderStatus;
