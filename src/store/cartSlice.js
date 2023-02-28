import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const add = (a, b) => {
  return Number((a + b).toFixed(2));
};

const sub = (a, b) => {
  return Number((a - b).toFixed(2));
};

const user = JSON.parse(localStorage.getItem("isLoggedIn"));

if (user !== null && user.cart) {
  initialState = user.cart;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalAmount = add(state.totalAmount, newItem.discountedPrice);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          discountedPrice: newItem.discountedPrice,
          quantity: 1,
          totalPrice: newItem.discountedPrice,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = add(
          existingItem.totalPrice,
          existingItem.discountedPrice
        );
      }
      const localUserData = JSON.parse(localStorage.getItem("isLoggedIn"));
      localUserData.cart = state;
      localStorage.setItem("isLoggedIn", JSON.stringify(localUserData));
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount = sub(state.totalAmount, existingItem.discountedPrice);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = sub(
          existingItem.totalPrice,
          existingItem.discountedPrice
        );
      }
      const localUserData = JSON.parse(localStorage.getItem("isLoggedIn"));
      JSON.stringify(state) === JSON.stringify(initialState)
        ? delete localUserData.cart
        : (localUserData.cart = state);
      localStorage.setItem("isLoggedIn", JSON.stringify(localUserData));
    },

    resetState() {
      const newState = {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
      };
      const localUserData = JSON.parse(localStorage.getItem("isLoggedIn"));
      delete localUserData.cart;
      localStorage.setItem("isLoggedIn", JSON.stringify(localUserData));
      return newState;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
