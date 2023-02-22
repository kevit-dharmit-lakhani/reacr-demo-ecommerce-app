import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isShown: false,
  type: null,
  message: null,
};

const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    newNotif(state, action) {
      state.isShown = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    resetState() {
      return initialState;
    },
  },
});

export const notifActions = notifSlice.actions;

export default notifSlice;
