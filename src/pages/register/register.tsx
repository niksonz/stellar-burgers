import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
<<<<<<< HEAD
import { useDispatch, useSelector } from '@store';
import {
  getError,
  registerUser
} from '../../services/slices/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';
=======
import { TRegisterData } from '@api';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchLoginUser, fetchRegisterUser } from '../../slices/userSlice';
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

export const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(getError);

  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    dispatch(registerUser({ email, password, name: userName }));
    navigate('/login');
=======
    const userData: TRegisterData = {
      name,
      email,
      password
    };
    const resultAction = await dispatch(fetchRegisterUser(userData));

    if (fetchRegisterUser.fulfilled.match(resultAction)) {
      dispatch(
        fetchLoginUser({ email: userData.email, password: userData.password })
      );
    }
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
  };

  return (
    <RegisterUI
<<<<<<< HEAD
      errorText={error?.toString()}
=======
      errorText={error?.message}
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
    />
  );
};
