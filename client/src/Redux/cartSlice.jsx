import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsNumbers: null,
  subtotal: 0,
};

export const cartSlise = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addProductExists = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (addProductExists) {
        addProductExists.quantity += parseInt(action.payload.quantity);
      } else {
        state.products.push({
          ...action.payload,
          quantity: parseInt(action.payload.quantity),
        });
      }
      // Namber of Prouducts
      state.productsNumbers =
        state.productsNumbers + parseInt(action.payload.quantity);

      // Calculate the subtotal
      state.subtotal = state.products.reduce(
        (subtotal, product) => subtotal + product.price * product.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const removeProduct = state.products.find(
        (product) => product.id === action.payload
      );
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products.splice(index, 1);
      state.productsNumbers -= removeProduct.quantity;
    },
    incrementCart: (state, action) => {
      const incrementProduct = state.products.find(
        (product) => product.id === action.payload
      );
      if (incrementProduct.quantity >= 1) {
        incrementProduct.quantity++;
        state.subtotal += incrementProduct.price;
        state.productsNumbers += 1;
      }
    },
    decrementCart: (state, action) => {
      const decrementProduct = state.products.find(
        (product) => product.id === action.payload
      );
      if (!decrementProduct || decrementProduct.quantity === 1) {
        return;
      } else {
        decrementProduct.quantity--;
        state.subtotal -= decrementProduct.price;
        state.productsNumbers -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, incrementCart, decrementCart } =
  cartSlise.actions;

export default cartSlise.reducer;
