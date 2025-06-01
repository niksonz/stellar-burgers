import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '@store';
import { getConstructorState } from '../../services/slices/constructorSlice/constructorSlice';

import { useAppSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
<<<<<<< HEAD
  const constructorItems = useSelector(getConstructorState).constructorItems;
=======
  const { bun, ingredients: selectedIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const burgerConstructor = {
    bun: {
      _id: bun?._id
    },
    ingredients: selectedIngredients
  };
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = constructorItems;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun._id) counters[bun._id] = 2;
    return counters;
  }, [constructorItems]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
