import { FC, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
<<<<<<< HEAD
import { Params, useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector(getIngredientState);
  const { id } = useParams<Params>();

  const ingredientData = ingredients.find((i) => {
    if (i._id === id) {
      return i;
    }
  });
=======
import { useAppSelector } from '../../services/store';

import { redirect, useLocation, useParams } from 'react-router-dom';

export const IngredientDetails: FC<{ title?: string }> = ({ title }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isModalOpen = location.state?.background;

  if (!id) {
    redirect('/');
    return null;
  }

  const { ingredients, error, isLoading } = useAppSelector(
    (state) => state.ingredients
  );

  const ingredientData = ingredients.find((item) => item._id === id);

  const [isImageLoaded, setImageLoaded] = useState(false);
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

  if (!ingredientData) {
    return <Preloader />;
  }

  if (error) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <>
      {(!isImageLoaded || isLoading) && <Preloader />}
      <IngredientDetailsUI
        ingredientData={ingredientData}
        onImageLoad={() => setImageLoaded(true)}
        title={title || 'Детали ингредиента'}
        isModalOpen={!!isModalOpen}
      />
    </>
  );
};
