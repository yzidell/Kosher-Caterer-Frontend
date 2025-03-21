/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const place_order = createAsyncThunk(
    'order/place_order',
    async({ customerName, customerEmail, customerPhone, price, products, shipping_fee, items, eventDetailsInfo, userId, navigate, isDeposit, 
        stripePublishableKey, sellerPrimaryColor1, sellerSecondaryColor1, sellerBoolShowPayments}) => {
        try {
           const { data } = await api.post('/home/order/place-order',{
                customerName, customerEmail, customerPhone,  
                price, products, shipping_fee, items, eventDetailsInfo, userId, navigate
            })
            //console.log(sellerBoolShowPayments)
            //if sellerBoolShowPayments
            
            navigate('/payment',{
                state: {
                    price:price, //+ shipping_fee,
                    items,
                    orderId: data.orderId,
                    isDeposit: isDeposit,
                    stripePublishableKey: stripePublishableKey,
                    sellerPrimaryColor1: sellerPrimaryColor1,
                    sellerSecondaryColor1: sellerSecondaryColor1 
                }
            })
            //console.log(eventDetailsInfo)
            //console.log(data)            
        } catch (error) {
            console.log(error.response)
        }
    }
)
// End Method 

export const get_customer_orders = createAsyncThunk(
    'order/get_customer_orders',
    async({customerId, status}, { rejectWithValue,fulfillWithValue }) => {
        //console.log(customerId)
        try {
            const {data} = await api.get(`/home/customer/get-customer-orders/${customerId}/${status}`) 
            //console.log('customerId ', customerId)
            //console.log('status ', status)
            
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const get_customer_order_details = createAsyncThunk(
    'order/get_customer_order_details',
    async(orderId , { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/customer/get-customer-order-details/${orderId}`) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const orderReducer = createSlice({
    name: 'order',
    initialState:{
        myOrders : [], 
        errorMessage : '',
        successMessage: '',  
        myOrder : {}
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(get_customer_orders.fulfilled, (state, { payload }) => { 
            state.myOrders = payload.orders; 
        })
        .addCase(get_customer_order_details.fulfilled, (state, { payload }) => { 
            state.myOrder = payload.order; 
            //console.log(state.myOrder.eventDetailsInfo)
        })
    }
})

export const {messageClear} = orderReducer.actions
export default orderReducer.reducer
