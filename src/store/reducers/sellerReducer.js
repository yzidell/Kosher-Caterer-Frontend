/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

//const webSiteOrigin = window.location.origin; //works

//look authreducer form dashboard - userInfo has te data
// export const get_seller_by_webSiteOrigin = createAsyncThunk(
//     'chat/add_friend',
//     async(info, { rejectWithValue,fulfillWithValue }) => {
//         try {
//             const {data} = await api.post('/chat/customer/add-customer-friend', info)
//            // console.log(data)
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
// End Method 

// from dashboard
export const get_seller_by_frontEndURL = createAsyncThunk(
    'seller/get_seller_by_frontEndURL',
    async(frontEndURL ,{rejectWithValue, fulfillWithValue}) => {
        //console.log('get_seller_by_frontEndURL ', frontEndURL)
        try {
            const {data} = await api.get(`get-seller-by-frontEndURL/${encodeURIComponent(frontEndURL)}`)
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data)
//             return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const sellerReducer = createSlice({
    name: 'seller',
    initialState:{
        sellerId: '',
        // fb_messages: [],
        // currentFd: "",
        errorMessage : '',
        successMessage: '', 
        seller: ''
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(get_seller_by_frontEndURL.fulfilled, (state, { payload }) => { 
            state.seller = payload.seller; 
        //     state.fb_messages = payload.messages;
        //     state.currentFd = payload.currentFd;
        //     state.my_friends = payload.MyFriends;
        })
       
    }
})

export const {messageClear} = sellerReducer.actions
export default sellerReducer.reducer
