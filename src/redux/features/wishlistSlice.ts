import { createSlice } from '@reduxjs/toolkit';

interface WishlistState {
  wishlist: any[];
}

const initialState: WishlistState = {
  wishlist: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlist.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;