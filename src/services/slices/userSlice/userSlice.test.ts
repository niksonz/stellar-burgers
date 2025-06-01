import userSlice, {
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  getUser,
  getOrdersAll
} from './userSlice';
import { expect, test, describe } from '@jest/globals';
import { TOrder, TUser } from '../../../utils/types';

type TUserState = typeof initialState;

const mockUser: TUser = {
  email: 'space.chef@galaxy.com',
  name: 'SpaceChef'
};

const mockOrder: TOrder = {
  _id: 'test-order-id',
  number: 38483,
  name: 'Космический бургер',
  status: 'done',
  createdAt: '2024-04-21T15:45:22.123Z',
  updatedAt: '2024-04-21T15:45:23.456Z',
  ingredients: ['643d69a5c3f7b9001cfa0946']
};

describe('User Slice Reducer Tests', () => {
  test('should return the initial state', () => {
    expect(userSlice(undefined, { type: 'INIT' })).toEqual(initialState);
  });

  describe('Authentication flow tests', () => {
    test('should handle loginUser actions', () => {
      let state = userSlice(initialState, loginUser.pending('', { email: 'space.chef@galaxy.com', password: 'password123' }));
      expect(state.loginUserRequest).toBe(true);
      expect(state.error).toBeNull();

      state = userSlice(state, loginUser.fulfilled({
        success: true,
        user: mockUser,
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token'
      }, '', { email: 'space.chef@galaxy.com', password: 'password123' }));

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.userData).toEqual(mockUser);
      expect(state.error).toBeNull();

      const error = new Error('Invalid credentials');
      state = userSlice(initialState, loginUser.rejected(error, '', { email: 'wrong@email.com', password: 'wrongpass' }));

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.userData).toBeNull();
      expect(state.error).toBe('Invalid credentials');
    });

    test('should handle registerUser actions', () => {
      const registrationData = {
        email: 'new.chef@galaxy.com',
        password: 'password123',
        name: 'NewChef'
      };

      let state = userSlice(initialState, registerUser.pending('', registrationData));
      expect(state.request).toBe(true);
      expect(state.error).toBeNull();

      state = userSlice(state, registerUser.fulfilled({
        success: true,
        user: { email: registrationData.email, name: registrationData.name },
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token'
      }, '', registrationData));

      expect(state.request).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.userData).toEqual({ email: registrationData.email, name: registrationData.name });
      expect(state.error).toBeNull();

      const error = new Error('Email already exists');
      state = userSlice(initialState, registerUser.rejected(error, '', registrationData));

      expect(state.request).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.userData).toBeNull();
      expect(state.error).toBe('Email already exists');
    });

    test('should handle logoutUser actions', () => {
      // Start with authenticated state
      let state = userSlice(initialState, loginUser.fulfilled({
        success: true,
        user: mockUser,
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token'
      }, '', { email: 'space.chef@galaxy.com', password: 'password123' }));

      // Start logout
      state = userSlice(state, logoutUser.pending(''));
      expect(state.request).toBe(true);
      expect(state.error).toBeNull();

      // Successful logout
      state = userSlice(state, logoutUser.fulfilled(undefined, ''));
      expect(state.request).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.userData).toBeNull();
      expect(state.error).toBeNull();

      // Failed logout
      const error = new Error('Network error during logout');
      state = userSlice(state, logoutUser.rejected(error, ''));
      expect(state.request).toBe(false);
      expect(state.error).toBe('Network error during logout');
    });
  });

  describe('User profile management tests', () => {
    test('should handle updateUser actions', () => {
      let state = userSlice(initialState, loginUser.fulfilled({
        success: true,
        user: mockUser,
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token'
      }, '', { email: 'space.chef@galaxy.com', password: 'password123' }));

      const updatedData = {
        name: 'UpdatedChef',
        email: 'updated.chef@galaxy.com',
        password: 'newpassword123'
      };

      state = userSlice(state, updateUser.pending('', updatedData));
      expect(state.request).toBe(true);
      expect(state.error).toBeNull();

      state = userSlice(state, updateUser.fulfilled({
        success: true,
        user: { name: updatedData.name, email: updatedData.email }
      }, '', updatedData));

      expect(state.request).toBe(false);
      expect(state.response).toEqual({ name: updatedData.name, email: updatedData.email });
      expect(state.error).toBeNull();

      const error = new Error('Invalid password');
      state = userSlice(state, updateUser.rejected(error, '', updatedData));
      expect(state.request).toBe(false);
      expect(state.error).toBe('Invalid password');
    });

    test('should handle getUser actions', () => {

      let state = userSlice(initialState, getUser.pending(''));
      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthChecked).toBe(true);

      state = userSlice(state, getUser.fulfilled({
        success: true,
        user: mockUser
      }, ''));

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.userData).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(false);

      const error = new Error('Token expired');
      state = userSlice(initialState, getUser.rejected(error, ''));

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.userData).toBeNull();
      expect(state.isAuthChecked).toBe(false);
    });
  });

  describe('User orders management tests', () => {
    test('should handle getOrdersAll actions', () => {
      let state = userSlice(initialState, loginUser.fulfilled({
        success: true,
        user: mockUser,
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token'
      }, '', { email: 'space.chef@galaxy.com', password: 'password123' }));

      state = userSlice(state, getOrdersAll.pending(''));
      expect(state.request).toBe(true);
      expect(state.error).toBeNull();

      state = userSlice(state, getOrdersAll.fulfilled([mockOrder], ''));

      expect(state.request).toBe(false);
      expect(state.userOrders).toEqual([mockOrder]);
      expect(state.error).toBeNull();

      const error = new Error('Failed to fetch orders');
      state = userSlice(state, getOrdersAll.rejected(error, ''));
      expect(state.request).toBe(false);
      expect(state.error).toBe('Failed to fetch orders');
    });

    test('should handle empty orders response', () => {
      let state = userSlice(initialState, loginUser.fulfilled({
        success: true,
        user: mockUser,
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token'
      }, '', { email: 'space.chef@galaxy.com', password: 'password123' }));

      state = userSlice(state, getOrdersAll.fulfilled([], ''));

      expect(state.request).toBe(false);
      expect(state.userOrders).toEqual([]);
      expect(state.error).toBeNull();
    });
  });

  describe('Error handling and state transitions', () => {
    test('should clear errors when starting new requests', () => {
      let state = userSlice(initialState, loginUser.rejected(new Error('Previous error'), '', { email: 'test@test.com', password: 'password' }));

      state = userSlice(state, loginUser.pending('', { email: 'test@test.com', password: 'password' }));
      expect(state.error).toBeNull();

      state = userSlice(state, registerUser.pending('', { email: 'test@test.com', password: 'password', name: 'Test' }));
      expect(state.error).toBeNull();

      state = userSlice(state, updateUser.pending('', { name: 'Updated' }));
      expect(state.error).toBeNull();
    });

    test('should maintain authentication state through non-auth actions', () => {

      let state = userSlice(initialState, loginUser.fulfilled({
        success: true,
        user: mockUser,
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token'
      }, '', { email: 'space.chef@galaxy.com', password: 'password123' }));

      state = userSlice(state, getOrdersAll.pending(''));
      expect(state.isAuthenticated).toBe(true);
      expect(state.userData).toEqual(mockUser);

      state = userSlice(state, getOrdersAll.fulfilled([], ''));
      expect(state.isAuthenticated).toBe(true);
      expect(state.userData).toEqual(mockUser);
    });

    test('should handle network errors gracefully', () => {
      let state = initialState;
      const networkError = new Error('Network error');
      state = userSlice(state, loginUser.rejected(networkError, '', { email: 'test@test.com', password: 'password' }));
      expect(state.error).toBe('Network error');
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(false);

      state = userSlice(state, loginUser.pending('', { email: 'test@test.com', password: 'password' }));
      expect(state.error).toBeNull();
      expect(state.loginUserRequest).toBe(true);
    });
  });
});
