import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
<<<<<<< HEAD
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import {
  getOrdersAll,
  getUserState
} from '../../services/slices/userSlice/userSlice';
import { getFeeds } from '../../services/slices/feedSlice/feedSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const { userOrders, request } = useSelector(getUserState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAll());
    dispatch(getFeeds());
  }, []);

  if (request === true) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
=======
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchOrders } from '../../slices/orderSlice';

export const ProfileOrders: FC = () => {
  const { userOrders, userOrdersLoading } = useAppSelector(
    (state) => state.order
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return userOrdersLoading ? (
    <Preloader />
  ) : (
    <ProfileOrdersUI orders={userOrders} />
  );
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
};
