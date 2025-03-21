import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const get_customer_dashboard_index_data = createAsyncThunk(
    'customerDashboard/get_customer_dashboard_index_data',
    async(userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/customer/get-customer-dashboard-index-data/${userId}`) 
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const customerDashboardReducer = createSlice({
    name: 'customerDashboard',
    initialState:{
        recentOrders : [], 
        errorMessage : '',
        successMessage: '', 
        totalOrder: 0,
        pendingOrder: 0,
        cancelledOrder: 0
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(get_customer_dashboard_index_data.fulfilled, (state, { payload }) => { 
            state.totalOrder = payload.totalOrder;
            state.pendingOrder = payload.pendingOrder;
            state.cancelledOrder = payload.cancelledOrder;
            state.recentOrders = payload.recentOrders;
        })
      
    }
})

export const {messageClear} = customerDashboardReducer.actions
export default customerDashboardReducer.reducer
