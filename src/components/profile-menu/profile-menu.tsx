import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
<<<<<<< HEAD
import { useDispatch } from '@store';
import { logoutUser } from '../../services/slices/userSlice/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
=======
import { useAppDispatch } from '../../services/store';
import { fetchLogoutUser } from '../../slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(fetchLogoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
