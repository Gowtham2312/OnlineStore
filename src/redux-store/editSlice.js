
import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: 'edit',
    initialState: {
        editName: "",
        editImage: "",
    },
    reducers: {
        updateName: (state, action) => {
            state.editName = action.payload
            localStorage.setItem("username", JSON.stringify(state.editName))
            return state
        },
        updateImage: (state, action) => {
            state.editImage = action.payload
            localStorage.setItem("profilepic", JSON.stringify(state.editImage))
            return state
        },

    }
 })


export const { updateName, updateImage } = editSlice.actions
export default editSlice.reducer


