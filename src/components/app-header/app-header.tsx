import { FC } from 'react';
import { AppHeaderUI } from '@ui';
<<<<<<< HEAD
import { useSelector } from '@store';
import { getUserState } from '../../services/slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const data = useSelector(getUserState).userData;
  return <AppHeaderUI userName={data?.name ?? ''} />;
=======
import { useAppSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useAppSelector((state) => state.user.user?.name);
  return <AppHeaderUI userName={user} />;
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
};
