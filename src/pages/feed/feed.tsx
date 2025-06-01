import { getOrdersApi } from '@api';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
<<<<<<< HEAD
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import {
  getFeedState,
  getFeeds
} from '../../services/slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  const { orders, loading } = useSelector(getFeedState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
=======
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeed } from '../../slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Feed: FC = () => {
  const { orders, isLoading } = useAppSelector((state) => state.feed);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders.orders} handleGetFeeds={handleGetFeeds} />
  );
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
};
