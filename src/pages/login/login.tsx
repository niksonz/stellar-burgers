import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
<<<<<<< HEAD
import { useDispatch, useSelector } from '@store';
import { Navigate } from 'react-router-dom';
import {
  getError,
  getUserState,
  loginUser
} from '../../services/slices/userSlice/userSlice';
=======
import { useAppDispatch } from '../../services/store';
import { fetchLoginUser } from '../../slices/userSlice';

import { useNavigate } from 'react-router-dom';
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const error = useSelector(getError);

  const { isAuthenticated } = useSelector(getUserState);

  const dispatch = useDispatch();
=======
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!email || !password) {
      return;
    }
    dispatch(loginUser({ email, password }));
=======

    try {
      await dispatch(fetchLoginUser({ email, password })).unwrap();

      navigate('/');
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
