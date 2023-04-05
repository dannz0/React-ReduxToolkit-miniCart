import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async function (name, thunkAPI) {
    console.log(name);
    console.log(thunkAPI);
    console.log(thunkAPI.getState());
    // console.log(thunkAPI.dispatch(openModal()));

    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`something went wrong ${error.response}`);
    }
  }
);

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

    calcTotals: (state) => {
      const { cartAmount, cartPrice } = state.cartItems.reduce(
        (total, item) => {
          const { price, amount } = item;

          total.cartAmount += amount;
          total.cartPrice += amount * price;

          return total;
        },
        { cartAmount: 0, cartPrice: 0 }
      );
      state.amount = cartAmount;
      state.total = cartPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        // console.log(action);
        state.isLoading = false;
      });
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem, toggleAmount, calcTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
