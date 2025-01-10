import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './yourFeatureSlice';
import { Categories } from '../api/Categories';

const store = configureStore({
  reducer: {
    yourFeature: yourReducer,
    [Categories.reducerPath]: Categories.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Categories.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export default store;