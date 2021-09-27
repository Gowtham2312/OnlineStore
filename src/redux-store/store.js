import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import adminSlice from "./adminSlice"
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import editSlice from "./editSlice";

export default configureStore(
    {
        reducer:{
            user : userSlice,
            admin : adminSlice,
            products : productSlice,
            cart : cartSlice,
            edit : editSlice
        }
    }
)