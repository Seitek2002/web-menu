import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderProduct, IProductCatalog } from 'src/types/products.types';
import { IVenues } from 'src/types/venues.types';

export interface IFoodCart extends IProductCatalog {
  quantity: number;
}

interface YourFeatureState {
  value: number;
  isShow: boolean;
  items: IFoodCart[];
  buttonText: string;
  venue: IVenues | undefined;
  order: IOrderProduct;
}

// Функция для загрузки из localStorage
const loadItemsFromStorage = (): IFoodCart[] => {
  const storedItems = localStorage.getItem('cartItems');
  return storedItems ? JSON.parse(storedItems) : [];
};

const initialState: YourFeatureState = {
  value: 0,
  isShow: false,
  items: loadItemsFromStorage(), // Загружаем при инициализации
  buttonText: 'Заказать',
  venue: {
    colorTheme: '#875AFF',
    companyName: '',
    slug: '',
    logo: '',
    schedule: '',
  },
  order: {
    comment: '',
    orderProducts: [],
    phone: '',
    serviceMode: 0,
    servicePrice: '',
    tableNum: '',
    tipsPrice: '',
    venueSlug: '',
    spotSlug: '',
  },
};

const yourFeatureSlice = createSlice({
  name: 'yourFeature',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setShow: (state) => {
      state.isShow = !state.isShow;
    },
    setItems: (state, action: PayloadAction<IFoodCart[]>) => {
      state.items = action.payload;
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Сохранение
    },
    setVenue: (state, action: PayloadAction<IVenues | undefined>) => {
      state.venue = action.payload;
      localStorage.setItem('venue', JSON.stringify(state.venue));
    },
    addItem: (state, action: PayloadAction<IFoodCart>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (action.payload.quantity) {
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push({ ...action.payload });
        }
      } else {
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Сохранение
    },
    removeItem: (state, action: PayloadAction<IFoodCart>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    setButtonText: (state, action: PayloadAction<string>) => {
      state.buttonText = action.payload;
    },
    setOrder: (state, action: PayloadAction<IOrderProduct>) => {
      state.order = action.payload;
    }
  },
});

export const {
  increment,
  decrement,
  setShow,
  setItems,
  setVenue,
  addItem,
  removeItem,
  clearCart,
  setButtonText,
  setOrder,
} = yourFeatureSlice.actions;

export default yourFeatureSlice.reducer;
