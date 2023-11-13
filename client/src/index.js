import React from "react";
import ReactDOM from "react-dom/client";
//Styled
import "./index.css";
//componant
import App from "./App";
//React Router and Redux
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
//tosty
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick
        pauseOnHover={false}
      />
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);

// <React.StrictMode>

// </React.StrictMode>
