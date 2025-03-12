import './style.scss';
import { useAppSelector } from 'src/hooks/useAppSelector';

type PromoProps = {
  renameTitlePlaces: () => void;
};

const VibrationClick = () => {
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
};

const Promo: React.FC<PromoProps> = ({ renameTitlePlaces }) => {
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  return (
    <div className='busket__promo-code bg-[#fff]'>
      <input
        type='text'
        placeholder='Введите промокод'
        className='placeholder:text-[#80868B]'
      />
      <button
        className="text-white"
        style={{ backgroundColor: colorTheme }}
        onClick={() => {
          renameTitlePlaces();
          VibrationClick();
        }}
      >
        Применить
      </button>
    </div>
  );
};

export default Promo;
