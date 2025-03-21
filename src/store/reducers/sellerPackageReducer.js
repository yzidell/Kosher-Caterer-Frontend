/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_sellerPackages_webSiteOrigin = createAsyncThunk(
    'home/get_sellerPackages_webSiteOrigin',
    //'sellerPackage/get_sellerPackages_webSiteOrigin',
    async(webSiteOrigin, { fulfillWithValue }) => {
        //console.log(webSiteOrigin)
        try {
            const {data} = await api.get(`/get-sellerPackages-webSiteOrigin/${encodeURIComponent(webSiteOrigin)}`)
            //console.log('get_sellerPackages_webSiteOrigin ', data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data)
            //return rejectWithValue(error.response.data)
        }
    }
);
//end method

export const sellerPackageReducer = createSlice({
    name: 'sellerPackage',
    initialState:{
        successMessage :  '', 
        errorMessage : '', 
        sellerPackages : [], 
        totalSellerPackage: 0
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers : (builder) => {
         builder
        .addCase(get_sellerPackages_webSiteOrigin.fulfilled, (state, { payload }) => {
            state.totalSellerPackage = payload.totalSellerPackage;
            state.sellerPackages = payload.sellerPackages;
            //console.log(state.sellerPackages) //works
            //console.log('get_sellerPackages_webSiteOrigin ', payload.sellerPackages, payload.totalSellerPackage)
            
        })
      
    }
})

export const {messageClear} = sellerPackageReducer.actions
export default sellerPackageReducer.reducer
