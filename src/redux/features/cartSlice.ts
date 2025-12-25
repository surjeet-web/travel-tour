import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  cart: any[];
}

const initialState: CartState = {
  cart: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    remove_cart_product: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    }
  }
});

export const { addToCart, remove_cart_product } = cartSlice.actions;
export const hydrateCart = () => () => {
  // Empty function for compatibility
};
export default cartSlice.reducer;