// src/hooks/useFavourites.ts
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleFavourite, clearFavourites, setFavourites } from '../store/slices/favouritesSlice';

export function useFavourites() {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.ids);

  const toggle = (id: number) => dispatch(toggleFavourite(id));
  const clear = () => dispatch(clearFavourites());
  const set = (ids: number[]) => dispatch(setFavourites(ids));

  return { favourites, toggle, clear, set };
}
