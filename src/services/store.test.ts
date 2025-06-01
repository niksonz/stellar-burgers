import { configureStore, Store } from '@reduxjs/toolkit';
import constructorReducer, { addIngredient, removeIngredient } from './slices/constructorSlice/constructorSlice';
import ingredientReducer, { getIngredients } from './slices/ingredientSlice/ingredientSlice';
import orderReducer, { getOrderByNumber } from './slices/orderSlice/orderSlice';
import userReducer, { loginUser, logoutUser } from './slices/userSlice/userSlice';
import feedReducer, { getFeeds } from './slices/feedSlice/feedSlice';

describe('Redux Store Configuration Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        burgerConstructor: constructorReducer,
        ingredients: ingredientReducer,
        order: orderReducer,
        user: userReducer,
        feed: feedReducer
      }
    });
  });

  test('should initialize with the correct reducers', () => {
    const state = store.getState();
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');

    const reducers = store.getState();
    Object.keys(reducers).forEach(key => {
      expect(typeof store.dispatch).toBe('function');
    });
  });

  test('should have the correct initial state for each reducer', () => {
    const state = store.getState();

    expect(state.burgerConstructor).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    });

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect(state.order).toEqual({
      orderByNumberResponse: null,
      orders: [],
      request: false,
      responseOrder: null,
      error: null
    });

    expect(state.user).toEqual({
      userData: null,
      userOrders: [],
      request: false,
      loginUserRequest: false,
      isAuthChecked: false,
      isAuthenticated: false,
      error: null,
      response: null,
      registerData: null
    });

    expect(state.feed).toEqual({
      orders: [],
      loading: false,
      error: null,
      total: 0,
      totalToday: 0
    });
  });

  describe('Redux Action Integration Tests', () => {
    test('should handle ingredient state updates correctly', async () => {
      const mockIngredient = {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
      };

      await store.dispatch(getIngredients.fulfilled([mockIngredient], ''));

      const updatedState = store.getState();
      expect(updatedState.ingredients.ingredients).toEqual([mockIngredient]);
      expect(updatedState.ingredients.loading).toBe(false);
      expect(updatedState.ingredients.error).toBeNull();
    });

    test('should handle constructor state updates correctly', async () => {
      const mockBun = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      };

      store.dispatch(addIngredient(mockBun));
      
      const stateAfterAdd = store.getState();
      expect(stateAfterAdd.burgerConstructor.constructorItems.bun).toMatchObject({
        ...mockBun,
        id: expect.any(String)
      });

      const mockIngredient = {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
      };

      store.dispatch(addIngredient(mockIngredient));
      
      const stateAfterIngredient = store.getState();
      expect(stateAfterIngredient.burgerConstructor.constructorItems.ingredients[0]).toMatchObject({
        ...mockIngredient,
        id: expect.any(String)
      });
    });

    test('should handle feed state updates correctly', async () => {
      const mockOrders = [
        {
          _id: 'order1',
          number: 1234,
          name: 'Космический бургер',
          status: 'done',
          ingredients: ['643d69a5c3f7b9001cfa0946'],
          createdAt: '2024-04-21T15:45:22.123Z',
          updatedAt: '2024-04-21T15:45:23.456Z'
        }
      ];

      await store.dispatch(getFeeds.fulfilled({ 
        success: true,
        orders: mockOrders,
        total: 100,
        totalToday: 10
      }, ''));

      const updatedState = store.getState();
      expect(updatedState.feed.orders).toEqual(mockOrders);
      expect(updatedState.feed.total).toBe(100);
      expect(updatedState.feed.totalToday).toBe(10);
      expect(updatedState.feed.loading).toBe(false);
    });

    test('should handle order state updates correctly', async () => {
      const mockOrder = {
        _id: 'order1',
        number: 38483,
        name: 'Космический бургер',
        status: 'done',
        ingredients: ['643d69a5c3f7b9001cfa0946'],
        createdAt: '2024-04-21T15:45:22.123Z',
        updatedAt: '2024-04-21T15:45:23.456Z'
      };

      await store.dispatch(getOrderByNumber.fulfilled({ 
        success: true,
        orders: [mockOrder]
      }, '', 38483));

      const updatedState = store.getState();
      expect(updatedState.order.orderByNumberResponse).toEqual(mockOrder);
      expect(updatedState.order.request).toBe(false);
      expect(updatedState.order.error).toBeNull();
    });

    test('should handle user authentication flow', async () => {
      const mockUser = {
        email: 'space.chef@galaxy.com',
        name: 'SpaceChef'
      };

      await store.dispatch(loginUser.fulfilled({ 
        success: true,
        user: mockUser,
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token'
      }, '', { 
        email: 'space.chef@galaxy.com',
        password: 'password123'
      }));

      let state = store.getState();
      expect(state.user.userData).toEqual(mockUser);
      expect(state.user.isAuthenticated).toBe(true);

      await store.dispatch(logoutUser.fulfilled(undefined, ''));

      state = store.getState();
      expect(state.user.userData).toBeNull();
      expect(state.user.isAuthenticated).toBe(false);
    });

    test('should handle error states correctly', async () => {
      const errorMessage = 'Network Error';

      await store.dispatch(getIngredients.rejected(new Error(errorMessage), ''));
      await store.dispatch(getFeeds.rejected(new Error(errorMessage), ''));
      await store.dispatch(loginUser.rejected(new Error(errorMessage), '', { 
        email: 'test@test.com',
        password: 'password'
      }));

      const state = store.getState();
      expect(state.ingredients.error).toBe(errorMessage);
      expect(state.feed.error).toBe(errorMessage);
      expect(state.user.error).toBe(errorMessage);
    });
  });
});
