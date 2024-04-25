import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import  {setIsLoading}  from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        getProducts: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then(res => dispatch(getProducts(res.data)))
        
        .finally(dispatch(setIsLoading(false)))
}

export const filterProductsThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${id}`)
        .then((res) => dispatch(getProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

 export const searchProductThunk = (inputSearch) => (dispatch) => {
     dispatch(setIsLoading(true));
     return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${inputSearch}`)
         .then((res) => dispatch(getProducts(res.data)))
         .finally(() => dispatch(setIsLoading(false)));
 }

export const {getProducts} = productsSlice.actions;

export default productsSlice.reducer;
