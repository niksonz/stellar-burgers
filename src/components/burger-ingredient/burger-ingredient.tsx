import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from 'react-redux';
import { addIngredient } from '../../services/slices/constructorSlice/constructorSlice';
=======
import { v4 as uuidv4 } from 'uuid';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from 'react-redux';
import { addIngredient, setBun } from '../../slices/burgerConstructorSlice';
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
<<<<<<< HEAD
      dispatch(addIngredient(ingredient));
=======
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addIngredient({ ...ingredient, id: uuidv4() }));
      }
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
