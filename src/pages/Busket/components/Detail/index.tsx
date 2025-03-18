import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';

import './style.scss';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setOrder } from 'src/store/yourFeatureSlice';

const ForgotCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.yourFeature.order);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const { t } = useTranslation();

  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, '');

    const maxDigits = 12;
    const limitedDigits = digits.slice(0, maxDigits);

    let formatted = '+996';
    if (limitedDigits.length > 3) {
      formatted += ` (${limitedDigits.slice(3, 6)}`;
    }
    if (limitedDigits.length > 6) {
      formatted += `) ${limitedDigits.slice(6, 9)}`;
    }
    if (limitedDigits.length > 9) {
      formatted += `-${limitedDigits.slice(9, 12)}`;
    }
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = formatPhoneNumber(input);
    setPhone(formattedInput);
    dispatch(setOrder({ ...order, phone: formattedInput }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    dispatch(setOrder({ ...order, comment: e.target.value }));
  };

  return (
    <div className='busket__detail bg-white'>
      <div className='busket__detail-top'>
        <h4 className='busket__detail-name'>{t('busket.detail')}</h4>
        <h4
          className='busket__detail-required'
          style={{ color: colorTheme }} // Используем динамическое изменение цвета
        >
          {t('foodDetail.ingredients.necessarily')}
        </h4>
      </div>

      <input
        className='busket__detail-input first'
        id='phone'
        type='text'
        value={phone}
        onChange={handleInputChange}
        maxLength={18}
        placeholder='+996 700 000 000'
      />

      <input
        type='text'
        value={comment}
        className='busket__detail-input placeholder:text-[#80868B]'
        onChange={handleCommentChange}
        placeholder={t('busket.comment')}
      />
    </div>
  );
};

export default ForgotCart;
