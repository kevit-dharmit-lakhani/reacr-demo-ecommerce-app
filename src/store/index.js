import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import notifSlice from "./notifSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    notif: notifSlice.reducer,
  },
});

export default store;
