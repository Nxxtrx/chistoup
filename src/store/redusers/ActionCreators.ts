import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, getProduct } from "../../api/ProductApi";

export const fetchProduct = createAsyncThunk(
  'api/productForPage',
  async ({page, itemsPerPage, token}: {page:number, itemsPerPage:string, token:string}, thunkAPI) => {
    try {
      const response = await getProduct(page, itemsPerPage, token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchAuth = createAsyncThunk(
  'api/auth',
  async (_, thunkAPI) => {
    try {
      const response = await auth()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)