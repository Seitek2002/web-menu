import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductCatalog } from 'src/types/products.types';

interface IFoodCart extends IProductCatalog {
  quantity: number;
}

interface YourFeatureState {
  value: number;
  isShow: boolean;
  items: IFoodCart[];
}

const initialState: YourFeatureState = {
  value: 0,
  isShow: false,
  items: [],
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
    },
    addItem: (state, action: PayloadAction<IFoodCart>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
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
    },
  },
});

export const { increment, decrement, setShow, setItems, addItem, removeItem } =
  yourFeatureSlice.actions;
export default yourFeatureSlice.reducer;
