
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [],
        userWishlist: []
    },
    reducers: {
        updateCart: (state, action) => {
            state.cartProducts = action.payload
            localStorage.setItem("cartdata", JSON.stringify(state.cartProducts))
            return state
        },
        updateWishlist: (state, action) => {
            state.userWishlist = action.payload
            localStorage.setItem("wishlistData", JSON.stringify(state.userWishlist))
            return state
        },

    }
 })


export const { updateCart, updateWishlist } = cartSlice.actions
export default cartSlice.reducer


