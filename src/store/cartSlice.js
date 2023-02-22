import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
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
      state.totalAmount = state.totalAmount + newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      const localUserData = JSON.parse(localStorage.getItem("isLoggedIn"));
      localUserData.cart = state;
      localStorage.setItem("isLoggedIn", JSON.stringify(localUserData));
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount = state.totalAmount - existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      const localUserData = JSON.parse(localStorage.getItem("isLoggedIn"));
      JSON.stringify(state) === JSON.stringify(initialState)
        ? delete localUserData.cart
        : (localUserData.cart = state);
      localStorage.setItem("isLoggedIn", JSON.stringify(localUserData));
    },

    resetState() {
      const localUserData = JSON.parse(localStorage.getItem("isLoggedIn"));
      delete localUserData.cart;
      localStorage.setItem("isLoggedIn", JSON.stringify(localUserData));
      return initialState;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
