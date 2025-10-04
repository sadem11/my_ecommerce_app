// src/store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../domain/models';

// Load cart from localStorage or default to empty
const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;

type CartState = { items: CartItem[] };
const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const ex = state.items.find(i => i.productId === action.payload.productId);
      if (ex) ex.quantity += action.payload.quantity;
      else state.items.push(action.payload);

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity(state, action: PayloadAction<CartItem>) {
      const ex = state.items.find(i => i.productId === action.payload.productId);
      if (ex) ex.quantity = action.payload.quantity;

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.productId !== action.payload);

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
