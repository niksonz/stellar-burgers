import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
<<<<<<< HEAD
import { useSelector } from '@store';
import { getFeedState } from '../../services/slices/feedSlice/feedSlice';
=======
import { useAppSelector } from '../../services/store';
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
<<<<<<< HEAD
  const { orders, total, totalToday } = useSelector(getFeedState);

  const feed = { orders, total, totalToday };
=======
  const orders = useAppSelector((state) => state.feed.orders);
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

  const feed = {
    total: orders.total,
    totalToday: orders.totalToday
  };

  const readyOrders = getOrders(orders.orders, 'done');

  const pendingOrders = getOrders(orders.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
