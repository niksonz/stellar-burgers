import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
<<<<<<< HEAD
import { useSelector, useDispatch } from '@store';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumber,
  getOrderState
} from '../../services/slices/orderSlice/orderSlice';
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice';

export const OrderInfo: FC = () => {
  const number = Number(useParams().number);
  const { ingredients } = useSelector(getIngredientState);
  const { orderByNumberResponse, request } = useSelector(getOrderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByNumber(number));
  }, []);
=======
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchOrderByNumber } from '../../slices/orderSlice';
import { Modal } from '../modal';

export const OrderInfo: FC<{ title?: string }> = ({ title }) => {
  const { number } = useParams<{ number: string }>();
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const orderData = useAppSelector((state) => state.order.orderModalData);
  const isLoading = useAppSelector((state) => state.order.isLoading);
  const location = useLocation();
  const isModalOpen = location.state?.background;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrderByNumber(Number(number)));
  }, [dispatch]);
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

  const orderInfo = useMemo(() => {
    if (!orderByNumberResponse || !ingredients.length) return null;

    const date = new Date(orderByNumberResponse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderByNumberResponse.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderByNumberResponse,
      ingredientsInfo,
      date,
      total
    };
  }, [orderByNumberResponse, ingredients]);

  if (!orderInfo || request) {
    return <Preloader />;
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <OrderInfoUI
      orderInfo={orderInfo}
      isModalOpen={!!isModalOpen}
      title={title}
    />
  );
};
