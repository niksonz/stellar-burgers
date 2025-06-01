import feedSlice, {
  initialState,
  getFeeds,
  getFeedState
} from './feedSlice';
import { expect, test, describe } from '@jest/globals';
import { TOrder } from '../../../utils/types';

const mockOrders: TOrder[] = [
  {
    _id: 'test-order-id-1',
    number: 38483,
    name: 'Космический бургер',
    status: 'done',
    createdAt: '2024-04-21T15:45:22.123Z',
    updatedAt: '2024-04-21T15:45:23.456Z',
    ingredients: ['643d69a5c3f7b9001cfa0946']
  },
  {
    _id: 'test-order-id-2',
    number: 38484,
    name: 'Межгалактический бургер',
    status: 'pending',
    createdAt: '2024-04-21T15:46:22.123Z',
    updatedAt: '2024-04-21T15:46:23.456Z',
    ingredients: ['643d69a5c3f7b9001cfa0947']
  }
];

describe('Feed Slice Reducer Tests', () => {
  test('should return the initial state', () => {
    expect(feedSlice(undefined, { type: 'INIT' })).toEqual(initialState);
  });

  describe('Feed state management tests', () => {
    test('should handle getFeeds.pending', () => {
      const state = feedSlice(initialState, getFeeds.pending('', undefined));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('should handle getFeeds.rejected', () => {
      const error = new Error('Failed to fetch feeds');
      const state = feedSlice(initialState, getFeeds.rejected(error, '', undefined));
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch feeds');
    });

    test('should handle getFeeds.fulfilled', () => {
      const payload = {
        success: true,
        orders: mockOrders,
        total: 100,
        totalToday: 10
      };
      const state = feedSlice(initialState, getFeeds.fulfilled(payload, '', undefined));
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });

    test('should handle empty orders array', () => {
      const payload = {
        success: true,
        orders: [],
        total: 0,
        totalToday: 0
      };
      const state = feedSlice(initialState, getFeeds.fulfilled(payload, '', undefined));
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
      expect(state.error).toBeNull();
    });
  });

  describe('Selectors tests', () => {
    test('getFeedState selector should return the state', () => {
      const mockState = { feed: initialState };
      const result = getFeedState(mockState);
      expect(result).toEqual(initialState);
    });
  });
});
