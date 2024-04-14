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
    addNewProduct(state, action) {
      state.product.push(action.payload)
    },

    editProduct(state, action) {
      const index = state.product.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.product[index] = { ...state.product[index], ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<{result: IProduct[]}>) => {
      state.product = action.payload.result
    })
  }
})

export const {addNewProduct, editProduct} = ProductSlice.actions;

export default ProductSlice.reducer

