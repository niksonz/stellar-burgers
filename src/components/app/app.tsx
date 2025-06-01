import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
<<<<<<< HEAD
import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '@store';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/userSlice/userSlice';
import { getIngredients } from '../../services/slices/ingredientSlice/ingredientSlice';
import { CenteringComponent } from '../centering-component/centering-component';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

=======
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../slices/ingredientSlice';
import { AppRoutes } from './appRoutes';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import {
  fetchCheckAuth,
  fetchUser,
  setAuthChecked
} from '../../slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { refreshToken } from '@api';
import { resetOrderModalData } from '../../slices/orderSlice';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderNumber = useAppSelector(
    (state) => state.order.orderModalData?.number ?? ''
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = getCookie('refreshToken');
      if (refreshToken) {
        await dispatch(fetchUser());
        await dispatch(fetchCheckAuth());
      } else {
        dispatch(setAuthChecked(true));
      }
    };

    checkAuth();
  }, [dispatch, refreshToken]);

  const handleModalClose = () => {
    dispatch(resetOrderModalData());
    navigate(-1);
  };

>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
<<<<<<< HEAD
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <CenteringComponent title={'Детали ингредиента'}>
              <IngredientDetails />
            </CenteringComponent>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <CenteringComponent title={`#${location.pathname.match(/\d+/)}`}>
              <OrderInfo />
            </CenteringComponent>
          }
        />
        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute onlyUnAuth={false} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <CenteringComponent title={`#${location.pathname.match(/\d+/)}`}>
                <OrderInfo />
              </CenteringComponent>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  history.back();
                }}
              >
=======
        {/* Обычные роуты */}
        <Route path={AppRoutes.HOME} element={<ConstructorPage />} />
        <Route path={AppRoutes.FEED} element={<Feed />} />
        <Route
          path={AppRoutes.INGREDIENT_DETAILS}
          element={<IngredientDetails title='Детали ингредиента' />}
        />
        <Route
          path={AppRoutes.ORDER_DETAILS}
          element={<OrderInfo title={`#${orderNumber}`} />}
        />

        {/* Защищённые роуты */}
        <Route
          path={AppRoutes.LOGIN}
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.REGISTER}
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.FORGOT_PASSWORD}
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.RESET_PASSWORD}
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.PROFILE_ORDERS}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.PROFILE_ORDERS_NUMBER}
          element={
            <ProtectedRoute>
              <OrderInfo title={`#${orderNumber}`} />
            </ProtectedRoute>
          }
        />

        <Route path={AppRoutes.NOT_FOUND} element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {background && (
        <Routes>
          <Route
            path={AppRoutes.INGREDIENT_DETAILS}
            element={
              <Modal onClose={handleModalClose} title='Детали ингредиента'>
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
                <IngredientDetails />
              </Modal>
            }
          />
<<<<<<< HEAD

          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)}`}
                onClose={() => {
                  history.back();
                }}
              >
=======
          <Route
            path={AppRoutes.ORDER_DETAILS}
            element={
              <Modal onClose={handleModalClose} title={`#${orderNumber}`}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={AppRoutes.PROFILE_ORDERS_NUMBER}
            element={
              <Modal title={`#${orderNumber}`} onClose={handleModalClose}>
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
                <OrderInfo />
              </Modal>
            }
          />
<<<<<<< HEAD
          <Route element={<ProtectedRoute onlyUnAuth={false} />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={`#${location.pathname.match(/\d+/)}`}
                  onClose={() => {
                    history.back();
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
=======
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
        </Routes>
      )}
    </div>
  );
};

export default App;
