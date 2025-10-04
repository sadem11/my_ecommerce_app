// src/hooks/useCart.ts
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addItem, removeItem, updateQuantity, clearCart } from '../store/slices/cartSlice';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const add = (item: any) => dispatch(addItem(item));
  const remove = (id: number) => dispatch(removeItem(id));
  const update = (item: any) => dispatch(updateQuantity(item));
  const clear = () => dispatch(clearCart());

  return { cart, add, remove, update, clear };
}
