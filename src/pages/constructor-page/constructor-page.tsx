<<<<<<< HEAD
=======
import { useAppDispatch, useAppSelector } from '../../services/store';

>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { useSelector } from '@store';
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice';

export const ConstructorPage: FC = () => {
<<<<<<< HEAD
  const isIngredientsLoading = useSelector(getIngredientState).loading;
=======
  const { isLoading } = useAppSelector((state) => state.ingredients);
  const isIngredientsLoading = isLoading;
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
