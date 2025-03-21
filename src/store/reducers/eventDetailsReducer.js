/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const get_event_details = createAsyncThunk(
    'home/get_event_details', //eventDetails
    async(customerId, { rejectWithValue, fulfillWithValue }) => {
        //console.log(customerId)
        try {
            //const {data} = await api.get(`/home/product/get-cart-products/${userId}`) 
            //eventDetails eventDetailsCustomerDashboard /${customerId}
            const {data} = await api.get(`/home/get-event-details/${customerId}`) 
            //console.log(data)
            //console.log(userId)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const update_event_details = createAsyncThunk(
    'home/update_event_details',//home
        async(info, { rejectWithValue,fulfillWithValue }) => {
        //console.log(info)
        try {
            const {data} = await api.put('/home/update-event-details', info) 
            // console.log('info ', info)
            //console.log('update_event_details data ', data) 
            //console.log(eventDetails)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
     }
)
// End Method 

export const eventDetailsReducer = createSlice({
    name: 'eventDetails',
    initialState:{
        depositGiven: 'false',
        eventName: '',
        venueName: '',
        venueAddress: '',
        eventType: '', 
        eventDate: '', 
        eventStartTime: '',
        eventServiceType: '', 
        eventPlaceSettings: '', 
        eventTableclothColor:'', 
        eventNapkinColor: '',
        venueManagerContactInfo: '', 
        eventGuestCount: 0, 
        eventNotes: ''
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        // .addCase(add_to_cart.rejected, (state, { payload }) => {
        //     state.errorMessage = payload.error; 
        // })
        .addCase(get_event_details.fulfilled, (state, { payload }) => { 
        //     state.successMessage = payload.message; 
            state.eventDetails = payload.eventDetails
        //     //console.log(state.cart_product_count)
        })

        .addCase(update_event_details.fulfilled, (state, { payload }) => { 
            state.eventDetails = payload.eventDetailsUpdated;
            state.successMessage = payload.message; 

            // state.product = payload.product 
            // state.successMessage = payload.message 

        //     state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1   
        //     //console.log('state.wishlist_count ', state.wishlist_count)
        //     //console.log('wishlist_count ', payload.wishlist_count)
        })
       
    }
})

export const {messageClear} = eventDetailsReducer.actions
export default eventDetailsReducer.reducer
