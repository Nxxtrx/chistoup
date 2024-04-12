import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAuth, fetchProduct } from "./ActionCreators";
import IProduct from "../../models/IProduct";

interface ProductState {
  product: IProduct[],
}

const initialState: ProductState = {
  product: [],
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers:{
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<{result: IProduct[]}>) => {
      state.product = action.payload.result
    })
  }
})

export const {} = ProductSlice.actions;

export default ProductSlice.reducer

