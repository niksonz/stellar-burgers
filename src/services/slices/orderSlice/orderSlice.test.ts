import orderSlice, { initialState, getOrderByNumber } from './orderSlice';
import { expect, test, describe } from '@jest/globals';
import { TOrder } from '../../../utils/types';

const mockOrder: TOrder = {
  _id: 'test-order-id',
  number: 38483,
  name: 'Космический бургер',
  status: 'done',
  createdAt: '2024-04-21T15:45:22.123Z',
  updatedAt: '2024-04-21T15:45:23.456Z',
  ingredients: ['643d69a5c3f7b9001cfa0946']
};

describe('Order Slice Reducer Tests', () => {
  test('should return the initial state', () => {
    expect(orderSlice(undefined, { type: 'INIT' })).toEqual(initialState);
  });

  describe('getOrderByNumber action tests', () => {
    test('should handle getOrderByNumber.pending', () => {
      const state = orderSlice(initialState, getOrderByNumber.pending('', 38483));
      expect(state.request).toBe(true);
      expect(state.error).toBeNull();
    });

    test('should handle getOrderByNumber.fulfilled', () => {
      const state = orderSlice(
        initialState,
        getOrderByNumber.fulfilled({ 
          success: true,
          orders: [mockOrder]
        }, '', 38483)
      );

      expect(state.request).toBe(false);
      expect(state.orderByNumberResponse).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    test('should handle getOrderByNumber.rejected', () => {
      const error = new Error('Failed to fetch order');
      const state = orderSlice(
        initialState,
        getOrderByNumber.rejected(error, '', 38483)
      );

      expect(state.request).toBe(false);
      expect(state.orderByNumberResponse).toBeNull();
      expect(state.error).toBe('Failed to fetch order');
    });
  });

  describe('Order state management tests', () => {
    test('should handle multiple orders sequentially', () => {
      let state = orderSlice(initialState, getOrderByNumber.pending('', 38483));
      expect(state.request).toBe(true);

      state = orderSlice(
        state,
        getOrderByNumber.fulfilled({ 
          success: true,
          orders: [mockOrder]
        }, '', 38483)
      );
      expect(state.request).toBe(false);
      expect(state.orderByNumberResponse).toEqual(mockOrder);

      const secondOrder: TOrder = {
        ...mockOrder,
        _id: 'test-order-id-2',
        number: 38484,
        name: 'Межгалактический бургер'
      };

      state = orderSlice(state, getOrderByNumber.pending('', 38484));
      expect(state.request).toBe(true);
      expect(state.orderByNumberResponse).toEqual(mockOrder);

      state = orderSlice(
        state,
        getOrderByNumber.fulfilled({ 
          success: true,
          orders: [secondOrder]
        }, '', 38484)
      );
      expect(state.request).toBe(false);
      expect(state.orderByNumberResponse).toEqual(secondOrder);
      expect(state.error).toBeNull();
    });

    test('should handle error state transitions', () => {
      let state = orderSlice(
        initialState,
        getOrderByNumber.rejected(new Error('Initial error'), '', 38483)
      );
      expect(state.error).toBe('Initial error');

      state = orderSlice(state, getOrderByNumber.pending('', 38484));
      expect(state.request).toBe(true);
      expect(state.error).toBeNull();

      state = orderSlice(
        state,
        getOrderByNumber.fulfilled({ 
          success: true,
          orders: [mockOrder]
        }, '', 38484)
      );
      expect(state.request).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderByNumberResponse).toEqual(mockOrder);
    });

    test('should handle empty orders array in response', () => {
      const state = orderSlice(
        initialState,
        getOrderByNumber.fulfilled({ 
          success: true,
          orders: []
        }, '', 38483)
      );

      expect(state.request).toBe(false);
      expect(state.orderByNumberResponse).toBe(undefined);
      expect(state.error).toBeNull();
    });

    test('should handle invalid order number', () => {
      const error = new Error('Order not found');
      const state = orderSlice(
        initialState,
        getOrderByNumber.rejected(error, '', -1)
      );

      expect(state.request).toBe(false);
      expect(state.orderByNumberResponse).toBeNull();
      expect(state.error).toBe('Order not found');
    });

    test('should handle network errors gracefully', () => {
      const networkError = new Error('Network error');
      let state = orderSlice(
        initialState,
        getOrderByNumber.rejected(networkError, '', 38483)
      );

      expect(state.request).toBe(false);
      expect(state.orderByNumberResponse).toBeNull();
      expect(state.error).toBe('Network error');

      state = orderSlice(
        state,
        getOrderByNumber.fulfilled({ 
          success: true,
          orders: [mockOrder]
        }, '', 38483)
      );

      expect(state.request).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderByNumberResponse).toEqual(mockOrder);
    });
  });
});
