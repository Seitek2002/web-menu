import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/useAppSelector';
import BusketCard from 'components/Cards/Cart';
import ClosedModal from 'components/ClosedModal';

import './style.scss';

import { isClosedNow } from 'src/utlis/workTime';

const BusketDesktop = ({
  to,
  createOrder,
  disabled,
}: {
  createOrder?: () => void;
  to: string;
  disabled?: boolean;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const venueData = useAppSelector((state) => state.yourFeature.venue);
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const location = useLocation();

  const [showClosed, setShowClosed] = useState(false);

  const handleClick = () => {
    const closed = isClosedNow(venueData?.schedule || '');
    if (closed) {
      setShowClosed(true);
      return;
    }
    if (location.pathname === '/cart') {
      if (createOrder) createOrder();
    } else {
      navigate(to);
    }
  };

  return (
    <div className='busket__content'>
      <ClosedModal isShow={showClosed} onClose={() => setShowClosed(false)} />
      {venueData?.table?.tableNum && (
        <div className='table-num'>{t('table')}{venueData.table.tableNum}</div>
      )}
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <BusketCard key={item.id} item={item} />
          ))}
          <button
            style={{ backgroundColor: colorTheme }}
            onClick={handleClick}
            disabled={disabled}
          >
            {t("button.next")}
          </button>
        </>
      ) : (
        <div className='busket__empty text-center'>
          {t('basket.addItems')}
        </div>
      )}
    </div>
  );
};

export default BusketDesktop;
