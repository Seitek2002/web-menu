import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './yourFeatureSlice';
import { Categories } from 'src/api/Categories.api';
import { Products } from 'src/api/Products.api';

const store = configureStore({
  reducer: {
    yourFeature: yourReducer,
    [Categories.reducerPath]: Categories.reducer,
    [Products.reducerPath]: Products.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Categories.middleware).concat(Products.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export default store;
