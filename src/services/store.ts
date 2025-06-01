import { combineReducers, configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import constructorSlice from './slices/constructorSlice/constructorSlice';
import orderSlice from './slices/orderSlice/orderSlice';
import feedSlice from './slices/feedSlice/feedSlice';
import userSlice from './slices/userSlice/userSlice';
import ingredientSlice from './slices/ingredientSlice/ingredientSlice';
=======
import ingredientsReducer from '../slices/ingredientSlice';
import burgerConstructorReducer from '../slices/burgerConstructorSlice';
import feedReducer from '../slices/feedSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';
import modalReducer from '../slices/modalSlice';
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
<<<<<<< HEAD
  ingredient: ingredientSlice,
  order: orderSlice,
  constructorBurger: constructorSlice,
  feed: feedSlice,
  user: userSlice
=======
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  modal: modalReducer
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
