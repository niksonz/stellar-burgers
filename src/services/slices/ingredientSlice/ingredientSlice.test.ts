import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';
import { expect, test, describe } from '@jest/globals';
import { TIngredient } from '../../../utils/types';

const mockIngredients: TIngredient[] = [
  {
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
  },
  {
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
  },
  {
    _id: '643d69a5c3f7b9001cfa0947',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
  }
];

describe('Ingredient Slice Reducer Tests', () => {
  test('should return the initial state', () => {
    expect(ingredientSlice(undefined, { type: 'INIT' })).toEqual(initialState);
  });

  describe('getIngredients action tests', () => {
    test('should handle getIngredients.pending', () => {
      const state = ingredientSlice(initialState, getIngredients.pending(''));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('should handle getIngredients.fulfilled', () => {
      const state = ingredientSlice(
        initialState,
        getIngredients.fulfilled(mockIngredients, '')
      );

      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    test('should handle getIngredients.rejected', () => {
      const error = new Error('Failed to fetch ingredients');
      const state = ingredientSlice(
        initialState,
        getIngredients.rejected(error, '')
      );

      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual([]);
      expect(state.error).toBe('Failed to fetch ingredients');
    });
  });

  describe('Ingredient state management tests', () => {
    test('should preserve existing ingredients when loading new ones', () => {
      let state = ingredientSlice(
        initialState,
        getIngredients.fulfilled([mockIngredients[0]], '')
      );

      state = ingredientSlice(
        state,
        getIngredients.fulfilled([mockIngredients[1], mockIngredients[2]], '')
      );

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients).toEqual([mockIngredients[1], mockIngredients[2]]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('should handle empty ingredients array', () => {
      const state = ingredientSlice(
        initialState,
        getIngredients.fulfilled([], '')
      );

      expect(state.ingredients).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('should handle multiple loading states correctly', () => {
      let state = ingredientSlice(initialState, getIngredients.pending(''));
      expect(state.loading).toBe(true);

      state = ingredientSlice(
        state,
        getIngredients.fulfilled([mockIngredients[0]], '')
      );
      expect(state.loading).toBe(false);
      expect(state.ingredients).toHaveLength(1);

      state = ingredientSlice(state, getIngredients.pending(''));
      expect(state.loading).toBe(true);
      expect(state.ingredients).toHaveLength(1);

      const error = new Error('Network error');
      state = ingredientSlice(
        { ...state, ingredients: [mockIngredients[0]] },
        getIngredients.rejected(error, '')
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
      expect(state.ingredients).toHaveLength(1);
    });

    test('should handle error state transitions', () => {
      let state = ingredientSlice(
        initialState,
        getIngredients.rejected(new Error('Initial error'), '')
      );
      expect(state.error).toBe('Initial error');

      state = ingredientSlice(state, getIngredients.pending(''));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();

      state = ingredientSlice(
        state,
        getIngredients.fulfilled(mockIngredients, '')
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredients);
    });
  });
});
