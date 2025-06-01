import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorState,
  orderBurger,
  setRequest,
  resetModal
} from '../../services/slices/constructorSlice/constructorSlice';
import { getUserState } from '../../services/slices/userSlice/userSlice';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchOrderBurger, resetOrderModalData } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const { constructorItems, orderModalData, orderRequest } =
    useSelector(getConstructorState);
  const isAuth = useSelector(getUserState).isAuthenticated;

  const dispatch = useDispatch();

  let arr: string[] = [];
  const ingredients: string[] | void = constructorItems.ingredients.map(
    (i) => i._id
  );
  if (constructorItems.bun) {
    const bun = constructorItems.bun?._id;
    arr = [bun, ...ingredients, bun];
  }

  const onOrderClick = () => {
    if (isAuth && constructorItems.bun) {
      dispatch(setRequest(true));
      dispatch(orderBurger(arr));
    } else if (isAuth && !constructorItems.bun) {
      return;
    } else if (!isAuth) {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModal());
=======
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  const { orderModalData, orderRequest } = useAppSelector(
    (state) => state.order
  );

  const constructorItems = {
    bun: bun ?? null,
    ingredients: ingredients ?? []
  };

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    if (!isAuthenticated) return navigate('/login');

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    await dispatch(fetchOrderBurger(order));
    dispatch(resetConstructor());
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
