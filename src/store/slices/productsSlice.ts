import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../domain/models';

type ProductsState = {
  items: Product[];
};

const initialState: ProductsState = {
  items: [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description for product 1',
      price: 100,
      image: 'https://via.placeholder.com/60',
      category: 'Category 1',
      rating: 4.5,
      stock: 10,
      favourite: false,
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description for product 2',
      price: 200,
      image: 'https://via.placeholder.com/60',
      category: 'Category 2',
      rating: 4.0,
      stock: 5,
      favourite: true,
    },
    // Add more products as needed
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    toggleFavourite(state, action: PayloadAction<number>) {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) {
        product.favourite = !product.favourite;
      }
    },
    // You can add more reducers here if needed
  },
});

export const { setProducts, toggleFavourite } = productsSlice.actions;
export default productsSlice.reducer;