import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  amenities: string;
  language: string;
  review: number;
  page: string;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: []
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    }
  }
});

export const { setProducts } = productSlice.actions;
export const selectProducts = (state: any) => state.products?.products || [];
export default productSlice.reducer;