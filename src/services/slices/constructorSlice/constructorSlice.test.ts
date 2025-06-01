import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient,
  resetModal
} from './constructorSlice';
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

describe('Constructor Slice Reducer Tests', () => {
  describe('addIngredient action tests', () => {
    test('should add bun to empty bun field', () => {
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

      const newState = constructorSlice(initialState, addIngredient(mockBun));

      expect(newState.constructorItems.bun).toMatchObject({
        ...mockBun,
        id: expect.any(String)
      });
      expect(newState.constructorItems.ingredients).toHaveLength(0);
      expect(newState.error).toBeNull();
    });

    test('should add ingredient to empty ingredients array', () => {
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

      const newState = constructorSlice(initialState, addIngredient(mockIngredient));

      expect(newState.constructorItems.ingredients[0]).toMatchObject({
        ...mockIngredient,
        id: expect.any(String)
      });
      expect(newState.constructorItems.bun).toBeNull();
      expect(newState.error).toBeNull();
    });

    test('should replace existing bun with new one', () => {
      const initialStateWithBun = {
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            id: 'test-id-1',
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: []
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };

      const newBun = {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      };

      const newState = constructorSlice(initialStateWithBun, addIngredient(newBun));

      expect(newState.constructorItems.bun).toMatchObject({
        ...newBun,
        id: expect.any(String)
      });
      expect(newState.constructorItems.ingredients).toHaveLength(0);
      expect(newState.error).toBeNull();
    });

    test('should add multiple ingredients in correct order', () => {
      const mockIngredients = [
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

      let state = initialState;
      mockIngredients.forEach(ingredient => {
        state = constructorSlice(state, addIngredient(ingredient));
      });

      expect(state.constructorItems.ingredients).toHaveLength(2);
      state.constructorItems.ingredients.forEach((ingredient, index) => {
        expect(ingredient).toMatchObject({
          ...mockIngredients[index],
          id: expect.any(String)
        });
      });
    });
  });

  describe('removeIngredient action tests', () => {
    const mockIngredient = {
      id: 'test-id-2',
      _id: '643d69a5c3f7b9001cfa0948',
      name: 'Кристаллы марсианских альфа-сахаридов',
      type: 'main',
      proteins: 234,
      fat: 432,
      carbohydrates: 111,
      calories: 189,
      price: 762,
      image: 'https://code.s3.yandex.net/react/code/core.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
    };

    const initialStateWithIngredient = {
      constructorItems: {
        bun: null,
        ingredients: [mockIngredient]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('should remove ingredient from constructor', () => {
      const newState = constructorSlice(initialStateWithIngredient, removeIngredient('test-id-2'));
      expect(newState.constructorItems.ingredients).toHaveLength(0);
      expect(newState.error).toBeNull();
    });

    test('should handle removing non-existent ingredient', () => {
      const newState = constructorSlice(initialStateWithIngredient, removeIngredient('non-existent-id'));
      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0]).toEqual(mockIngredient);
    });
  });

  describe('moveIngredient actions tests', () => {
    const mockIngredients = [
      {
        id: 'test-id-3',
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
        id: 'test-id-4',
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

    const initialStateWithIngredients = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('should move ingredient up in the list', () => {
      const newState = constructorSlice(initialStateWithIngredients, moveIngredientUp(1));
      expect(newState.constructorItems.ingredients[0].id).toBe('test-id-4');
      expect(newState.constructorItems.ingredients[1].id).toBe('test-id-3');
    });

    test('should move ingredient down in the list', () => {
      const newState = constructorSlice(initialStateWithIngredients, moveIngredientDown(0));
      expect(newState.constructorItems.ingredients[0].id).toBe('test-id-4');
      expect(newState.constructorItems.ingredients[1].id).toBe('test-id-3');
    });

    test('should handle moving first ingredient up', () => {
      const newState = constructorSlice(initialStateWithIngredients, moveIngredientUp(0));
      expect(newState.constructorItems.ingredients[0].id).toBe('test-id-4');
      expect(newState.constructorItems.ingredients[1].id).toBe('test-id-3');
      expect(newState.constructorItems.ingredients.length).toBe(2);
    });

    test('should handle moving last ingredient down', () => {
      const newState = constructorSlice(initialStateWithIngredients, moveIngredientDown(1));
      const expectedResult = {
        ...initialStateWithIngredients,
        constructorItems: {
          ...initialStateWithIngredients.constructorItems,
          ingredients: [
            mockIngredients[0],
            undefined,
            mockIngredients[1]
          ]
        }
      };
      const expected = expectedResult.constructorItems.ingredients;
      const received = newState.constructorItems.ingredients;
      expect(expected).toEqual(received);
    });
  });

  describe('orderBurger action tests', () => {
    test('should handle orderBurger.pending', () => {
      const state = constructorSlice(initialState, orderBurger.pending('', []));
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    test('should handle orderBurger.fulfilled', () => {
      const stateWithItems = {
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            id: 'test-bun-id',
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: [
            {
              id: 'test-id-3',
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
            }
          ]
        },
        loading: false,
        orderRequest: true,
        orderModalData: null,
        error: null
      };

      const state = constructorSlice(stateWithItems, orderBurger.fulfilled({ 
        success: true,
        name: 'Космический бургер',
        order: mockOrder
      }, '', []));

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.error).toBeNull();
      expect(state.constructorItems).toEqual({
        bun: null,
        ingredients: []
      });
    });

    test('should handle orderBurger.rejected', () => {
      const error = new Error('Failed to create order');
      const state = constructorSlice(initialState, orderBurger.rejected(error, '', []));
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toBeNull();
      expect(state.error).toBe('Failed to create order');
    });
  });

  describe('resetModal action tests', () => {
    const stateWithOrder = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      orderModalData: mockOrder,
      error: null
    };

    test('should reset modal data', () => {
      const newState = constructorSlice(stateWithOrder, resetModal());
      expect(newState.orderModalData).toBeNull();
      expect(newState.constructorItems).toEqual(stateWithOrder.constructorItems);
    });
  });
});
