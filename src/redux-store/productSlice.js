import { createAsyncThunk, createSlice}  from '@reduxjs/toolkit'
import axios from 'axios'

export const productList = createAsyncThunk("productlist", async( thunkAPI) =>{
    //make post 
    let data;
    let res = await axios.post('/gett-products')

    data = res.data
    
    if(data.message === "products get fetched")
    {
        return data.payload;
    }
   else
    {
        //it will provide data to rejected state
        return thunkAPI.rejectWithValue(data)
    }
})

const productSlice=createSlice({
    name : "products",
    initialState:{
        productObj : {},
        isSuccess:false,
        isLoading:false,
        isError:false,
        invalidLoginMessage:''
    },
    reducers:{
        updateProducts:(state,action)=>{
            console.log("Action in reducer",action)
            state.productObj=action.payload
            return state
        }
    }
    ,
    extraReducers:{
        [productList.fulfilled]:(state,action) =>{
            console.log("action payload message is",action.payload)//action.payload gives whatever is returned from AsyncThunk
            state.productObj=action.payload
            state.isSuccess=true;
            state.isLoading=false;
            state.invalidLoginMessage = "";
            state.isError=false;
        },
        [productList.pending]:(state,action) => {
            state.isLoading=true;
        },
        [productList.rejected]:(state,action) =>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.invalidLoginMessage=action.payload.message;

        }
    }
})
export let {updateProducts}=productSlice.actions
export default productSlice.reducer
