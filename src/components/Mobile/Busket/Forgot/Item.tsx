import { addItem, removeItem } from '../../../../store/yourFeatureSlice';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';

import AddItem from '../../../AddItem';

import './style.scss';

interface IProductModificator {
  id: number;
  name: string;
  price: string;
}

interface Category {
  id: number;
  categoryName: string;
}

interface ForgotCartProps {
  id: number;
  productName: string;
  productPrice: string;
  productDescription: string | null;
  productPhoto: string;
  weight: number;
  category: Category;
  modificators: IProductModificator[];
}

const Item: React.FC<ForgotCartProps> = ({
  id,
  productName,
  productPrice,
  productDescription,
  productPhoto,
  weight,
  category,
  modificators,
}) => {
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  const dispatch = useAppDispatch();

  // Проверяем наличие поддержки вибрации только один раз.
  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const added = () => {
    dispatch(
      addItem({
        id,
        productName,
        productPrice,
        productPhoto,
        productDescription,
        weight,
        category,
        quantity: 1,
        modificators,
      })
    );
    vibrate();
  };

  const deleteItem = () => {
    dispatch(
      removeItem({
        id,
        productName,
        productPrice,
        weight,
        productPhoto,
        category,
        productDescription,
        quantity: 0,
        modificators,
      })
    );
    vibrate();
  };

  return (
    <div className='busket__forgot-cart bg-[#fff]'>
      <div className='busket__forgot-inner'>
        <AddItem setDalete={deleteItem} setAdded={added} />
      </div>
      <img src={productPhoto} className='busket__forgot-img' alt='img' />
      <div className='busket__forgot-info'>
        <span
          className='busket__forgot-price'
          style={{ color: colorTheme }}
        >
          {productPrice} с
        </span>
        <span className='busket__forgot-weight text-[#ADADAD]'>
          • {weight} г
        </span>
      </div>
      <p className='busket__forgot-name'>{productName}</p>
    </div>
  );
};

export default Item;
