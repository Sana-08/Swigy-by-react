import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartsSlice"

const appStore=configureStore({
    reducer:{
        cart: cartReducer,
    },
});

export default appStore;