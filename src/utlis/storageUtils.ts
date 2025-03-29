import { IFoodCart } from "types/products.types";

export const saveCartToStorage = (cart: IFoodCart[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};

export const loadCartFromStorage = () => {
  const storedItems = localStorage.getItem('cartItems');
  return storedItems ? JSON.parse(storedItems) : [];
};
