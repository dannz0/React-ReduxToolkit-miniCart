import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;

      state.cartItems = state.cartItems.filter(
        (product) => product.id !== itemId
      );
    },
    toggleAmount: (state, action) => {
      const itemId = action.payload.id;
      const btnAction = action.payload.buttonAction;

      const cartItem = state.cartItems.find((item) => item.id === itemId);

      if (btnAction === 'inc') cartItem.amount++;

      if (btnAction === 'dec') cartItem.amount--;
    },
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem, toggleAmount } = cartSlice.actions;
export default cartSlice.reducer;
