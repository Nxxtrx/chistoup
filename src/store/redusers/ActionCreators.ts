import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, changeProduct, getProduct, setNewProduct } from "../../api/ProductApi";
import INewProduct from "../../models/INewProduct";

export const fetchProduct = createAsyncThunk(
  'api/productForPage',
  async ({page, itemsPerPage, searchQuery, token, sortBy, sortOrder}: {page:number, itemsPerPage:string, searchQuery: string, token:string, sortBy: string, sortOrder: string}, thunkAPI) => {
    try {
      const response = await getProduct(page, itemsPerPage, searchQuery, token, sortBy, sortOrder)
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

export const fetchNewProduct = createAsyncThunk(
  'api/product',
  async ({data, token}: {data:INewProduct, token: string}, thunkAPI) => {
    try {
      const response = await setNewProduct(data, token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchChangeProduct = createAsyncThunk(
  'api/product/id',
  async ({data, token, id}: {data:INewProduct, token: string, id:string}, thunkAPI) => {
    try {
      const response = await changeProduct(data, token, id)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)