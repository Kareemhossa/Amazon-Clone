import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import usertReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: usertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
