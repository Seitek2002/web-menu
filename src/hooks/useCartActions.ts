import { useAppDispatch } from "./useAppDispatch";
import { addItem, IFoodCart, removeItem } from "../store/yourFeatureSlice";

interface IUseCartActionsProps extends IFoodCart {
  setIsShow?: () => void;
}

export const useCartActions = ({
  id,
  productName,
  productPrice,
  productPhoto,
  weight,
  category,
  productDescription,
  modificators = [],
  setIsShow,
}: IUseCartActionsProps) => {
  const dispatch = useAppDispatch();

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleClick = () => {
    if (modificators.length > 0 && setIsShow) {
      setIsShow();
    } else {
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
    }
    vibrate();
  };

  const handleUnClick = () => {
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

  return { handleClick, handleUnClick };
};
