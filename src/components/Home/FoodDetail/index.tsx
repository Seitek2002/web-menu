import { FC, useState } from 'react';

import img1 from '../../../assets/images/Catalog/item-1.webp';
import addContainer from './add-container.svg';
import close from './close.svg';
import minus from './minus.svg';
import plus from './plus.svg';

import './style.scss';

interface IProps {
  setIsShow: () => void;
}

const FoodDetail: FC<IProps> = ({ setIsShow }) => {
  const [sugar, setSugar] = useState('');
  const [containerAdd, setContainerAdd] = useState(0);
  const [counter, setCounter] = useState(1);

  const handleCounterChange = (delta: number) => {
    setCounter((prev) => Math.max(1, prev + delta));
  };

  const handleDone = () => {
    const selectedData = {
      sugar,
      containerAdd,
      counter,
    };

    console.log('Выбранные данные:', selectedData);
  };

  return (
    <div className='food-detail'>
      <img src={close} alt='' className='close' onClick={setIsShow} />
      <div className='img-wrapper'>
        <img src={img1} alt='' />
      </div>
      <div className='food-detail__content'>
        <div className='description'>
          <h2>Капучино</h2>
          <p>Кофейный напиток с добавлением молока</p>
        </div>
        <div className='ingridients'>
          <h2>Состав</h2>
          <ul>
            <li>
              <p>
                Лепешка тортилья — мягкая, слегка обжаренная, с золотистой
                корочкой.
              </p>
            </li>
            <li>
              <p>
                Куриное филе в острой панировке — хрустящее снаружи, сочное
                внутри, с пикантными специями.
              </p>
            </li>
          </ul>
        </div>
        <div className='sugar'>
          <div className='flex items-center justify-between'>
            <h2>С сахаром или без?</h2>
            <div className='required'>Обязательно*</div>
          </div>
          <div className='sugar__content'>
            <div className='sugar__item'>
              <label className='checkbox'>
                <input
                  type='radio'
                  checked={sugar === 'with' ? true : false}
                  value={sugar}
                  onChange={() => setSugar('with')}
                />
                <span>C cахаром</span>
              </label>
              <div className='price'>+10 с</div>
            </div>
            <hr className='my-[8px]' />
            <div className='sugar__item'>
              <label className='checkbox'>
                <input
                  type='radio'
                  checked={sugar === 'without' ? true : false}
                  value={sugar}
                  onChange={() => setSugar('without')}
                />
                <span>Без cахара</span>
              </label>
              <div className='price'>Бесплатно</div>
            </div>
          </div>
        </div>
        <div className='size'>
          <div className='flex items-center justify-between'>
            <h2>Выберите размер</h2>
            <div className='required'>Обязательно*</div>
          </div>
          <div className='size__content'>
            <div className='size__item active'>
              <span>Маленький</span>
              <div className='price'>110 с</div>
            </div>
            <div className='size__item'>
              <span>Средний</span>
              <div className='price'>150 с</div>
            </div>
            <div className='size__item'>
              <span>Большой</span>
              <div className='price'>180 с</div>
            </div>
          </div>
        </div>
        <div className='case'>
          <div className='flex gap-[12px]'>
            {containerAdd ? (
              <div className='flex gap-[12px]'>
                <img
                  src={minus}
                  alt=''
                  onClick={() => setContainerAdd(containerAdd - 1)}
                />
                {containerAdd}
                <img
                  src={plus}
                  alt=''
                  onClick={() => setContainerAdd(containerAdd + 1)}
                />
              </div>
            ) : (
              <img
                src={addContainer}
                alt=''
                onClick={() => setContainerAdd(1)}
              />
            )}
            <span>Контейнер</span>
          </div>
          <div className='price'>+20 с</div>
        </div>
      </div>
      <footer className='counter'>
        <div className='counter__left'>
          <svg
            onClick={() => handleCounterChange(-1)}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3.75 12H20.25'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span
            style={{ margin: '0 12px', fontSize: '16px', fontWeight: 'bold' }}
          >
            {counter}
          </span>
          <svg
            onClick={() => handleCounterChange(1)}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3.75 12H20.25'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 3.75V20.25'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div className='counter__right'>
          <button onClick={handleDone}>Готово</button>
        </div>
      </footer>
    </div>
  );
};

export default FoodDetail;
