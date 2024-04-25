import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';
export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchase: (state, action) =>{
            return action.payload
        }
    }
})


export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
        .then((res) => {dispatch(setPurchase(res.data)), console.log('purchase', res);})

        .finally(() => dispatch(setIsLoading(false)));
}


export const { setPurchase } = purchasesSlice.actions;

export default purchasesSlice.reducer;
