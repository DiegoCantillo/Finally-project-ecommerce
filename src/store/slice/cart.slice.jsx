import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        getcart: (state, action) => {
            return action.payload
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
        .then((res) => dispatch(getcart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCarThunk = (car) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', car, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkaoutCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(getcart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { getcart } = cartSlice.actions;

export default cartSlice.reducer;
