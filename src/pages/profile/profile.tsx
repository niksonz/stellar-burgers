import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
<<<<<<< HEAD
import { useSelector, useDispatch } from '@store';
import {
  getUser,
  getUserState,
  updateUser
} from '../../services/slices/userSlice/userSlice';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const data = useSelector(getUserState).userData;
  const loading = useSelector(getUserState).request;
  const dispatch = useDispatch();

  const user = {
    name: data?.name || '',
    email: data?.email || ''
  };
=======
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchUpdateUser } from '../../slices/userSlice';

export const Profile: FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user.name || '',
      email: user.email || ''
    }));
  }, [data]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    dispatch(updateUser(formValue));
    dispatch(getUser());
=======
    dispatch(fetchUpdateUser(formValue));
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
  };

  if (loading) {
    return <Preloader />;
  }

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
