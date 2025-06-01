import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/constructorSlice/constructorSlice';
=======
import { removeIngredient } from '../../slices/burgerConstructorSlice';
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
<<<<<<< HEAD
=======

    const handleMoveDown = () => {};
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

    const handleMoveDown = () => {
      dispatch(moveIngredientDown(index));
    };

<<<<<<< HEAD
    const handleMoveUp = () => {
      dispatch(moveIngredientUp(index));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
=======
    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
